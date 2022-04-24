#!/usr/bin/env bash
#
# Generates a block file structure from the skeleton in blocks/.skel
#
#
SCRIPT=$(readlink -f "$0")
SCRIPTPATH=$(dirname "$SCRIPT")
BLOCKPATH="${SCRIPTPATH}/blocks"
BLOCKSKEL="${BLOCKPATH}/.skel"

usage() {
	echo "usage: $0 [-b|--blockname] [-t|--title] [-d|--description] [-n|--namespace] [-o|--outpath]"
	echo "  -b --blockname    REQUIRED. Name for the new block."
	echo "  -t --title        Title for the block."
	echo "  -d --description  Description."
	echo "  -n --namespace    PHP namespace to append to default."
	echo "  -o --outpath      Path to store new block, defaults to blocks/<blockname>"
	echo ""
	echo "  Be sure to enclose multi-word strings in quotes."
}

die() { echo "$*" >&2; usage; exit 2; }  # complain to STDERR and exit with error
needs_arg() { if [ -z "$OPTARG" ]; then die "No arg for --$OPT option"; fi; }

if [ ! -d $BLOCKSKEL ]; then
	die "Block skeleton was not found!"
fi

if [ -z "$1" ]; then
	echo "Required options missing!"
	usage && exit 1
fi

# https://raw.githubusercontent.com/UrsaDK/getopts_long/master/lib/getopts_long.bash
getopts_long() {
	: "${1:?Missing required parameter -- long optspec}"
	: "${2:?Missing required parameter -- variable name}"

	local optspec_short="${1%% *}-:"
	local optspec_long="${1#* }"
	local optvar="${2}"

	shift 2

	if [[ "${#}" == 0 ]]; then
		local args=()
		while [[ ${#BASH_ARGV[@]} -gt ${#args[@]} ]]; do
			local index=$(( ${#BASH_ARGV[@]} - ${#args[@]} - 1 ))
			args[${#args[@]}]="${BASH_ARGV[${index}]}"
		done
		set -- "${args[@]}"
	fi

	builtin getopts "${optspec_short}" "${optvar}" "${@}" || return 1
	[[ "${!optvar}" == '-' ]] || return 0

	printf -v "${optvar}" "%s" "${OPTARG%%=*}"

	if [[ "${optspec_long}" =~ (^|[[:space:]])${!optvar}:([[:space:]]|$) ]]; then
		OPTARG="${OPTARG#${!optvar}}"
		OPTARG="${OPTARG#=}"

		# Missing argument
		if [[ -z "${OPTARG}" ]]; then
			OPTARG="${!OPTIND}" && OPTIND=$(( OPTIND + 1 ))
			[[ -z "${OPTARG}" ]] || return 0

			if [[ "${optspec_short:0:1}" == ':' ]]; then
				OPTARG="${!optvar}" && printf -v "${optvar}" ':'
			else
				[[ "${OPTERR}" == 0 ]] || \
					echo "${0}: option requires an argument -- ${!optvar}" >&2
				unset OPTARG && printf -v "${optvar}" '?'
			fi
		fi
	elif [[ "${optspec_long}" =~ (^|[[:space:]])${!optvar}([[:space:]]|$) ]]; then
		unset OPTARG
	else
		# Invalid option
		if [[ "${optspec_short:0:1}" == ':' ]]; then
			OPTARG="${!optvar}"
		else
			[[ "${OPTERR}" == 0 ]] || echo "${0}: illegal option -- ${!optvar}" >&2
			unset OPTARG
		fi
		printf -v "${optvar}" '?'
	fi
}

while getopts_long ':b:t:d:n:o: blockname: name: title: description: desc: namespace: ns: outpath:' OPTKEY; do
	case ${OPTKEY} in
		'b'|'blockname'|'name')
			O_BLOCKNAME="${OPTARG}"
			;;
		't'|'title')
			O_TITLE="${OPTARG}"
			;;
		'd'|'desc'|'description')
			O_DESCRIPTION="${OPTARG}"
			;;
		'n'|'namespace'|'ns')
			O_NAMESPACE="${OPTARG}"
			;;
		'o'|'outpath'|'out')
			O_PATH="${OPTARG}"
			;;
		'?')
			echo "INVALID OPTION -- ${OPTARG}" >&2
			usage
			exit 1
			;;
		':')
			echo "MISSING ARGUMENT for option -- ${OPTARG}" >&2
			usage
			exit 1
			;;
		*)
			echo "UNIMPLEMENTED OPTION -- ${OPTKEY}" >&2
			usage
			exit 1
			;;
	esac
done

shift $(( OPTIND - 1 ))
[[ "${1}" == "--" ]] && shift

if [ -z "$O_BLOCKNAME" ]; then
	echo "Block name is required."
	usage && exit 1
fi

if [ -z "$O_PATH" ]; then
	O_PATH="${BLOCKPATH}/${O_BLOCKNAME}"
fi
echo "Copying skeleton to $O_PATH"
cp -a "$BLOCKSKEL/" "$O_PATH"

# set block name
sed -i '' -e 's/"name":.*/"name": "cumulus-gutenberg\/'${O_BLOCKNAME}'",/' "$O_PATH/block.json"

# set install path
sed -i '' -e "s/BASEDIR \. '\/build\/blocks\/.*/BASEDIR . '\/build\/blocks\/"${O_BLOCKNAME}"'/" "$O_PATH/install.php"

sjson() {
	sed -i '' -e 's/"'${1}'":.*/"'${1}'": "'"${2}"'",/' "$O_PATH/block.json"
}
# optional swaps
if [ ! -z "$O_TITLE" ]; then
	echo "Setting title to \"$O_TITLE\" in block.json"
	sjson 'title' "$O_TITLE"
fi
if [ ! -z "$O_DESCRIPTION" ]; then
	echo "Setting description to \"$O_DESCRIPTION\" in block.json"
	sjson 'description' "$O_DESCRIPTION"
fi
if [ ! -z "$O_NAMESPACE" ]; then
	echo "Setting namespace to CUMULUS\\Gutenberg\\Tools\\Blocks\\$O_NAMESPACE in install.php"
	sed -i '' -e 's/namespace .*/namespace CUMULUS\\Gutenberg\\Tools\\Blocks\\'"$O_NAMESPACE"';/' "$O_PATH/install.php"
fi

echo "Complete."