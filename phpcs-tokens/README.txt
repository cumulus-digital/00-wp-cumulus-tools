This folder contains additional tools for php-cs-fixer.

Wordpress-specific files used to automatically fully qualify core
functions and classes:
wp-core.csv - List of all core Wordpress symbols.
wp-classes.csv - List of all core Wordpress classes.
wp-consts.csv - List of all core Wordpress constants.
wp-functions.csv - List of all core Wordpress functions.

Built from the VS Code Wordpress Toolbox's snippets definition:
$ curl \
  https://raw.githubusercontent.com/jason-pomerleau/vscode-wordpress-toolbox/master/snippets/snippets.json \
  | sed -nE -e 's/.*(ƒ|Class|Constant): ([^"]+).*/"\2"/p' \
  | sed '/^$/d' | sed '$!s/$/,/' \
  > wp-core.csv

curl \
  https://raw.githubusercontent.com/jason-pomerleau/vscode-wordpress-toolbox/master/snippets/snippets.json \
  | sed -nE -e 's/.*(ƒ): ([^"]+).*/"\2"/p' \
  | sed '/^$/d' | sed '$!s/$/,/' \
  > wp-functions.csv

curl \
  https://raw.githubusercontent.com/jason-pomerleau/vscode-wordpress-toolbox/master/snippets/snippets.json \
  | sed -nE -e 's/.*(Class): ([^"]+).*/"\2"/p' \
  | sed '/^$/d' | sed '$!s/$/,/' \
  > wp-classes.csv

curl \
  https://raw.githubusercontent.com/jason-pomerleau/vscode-wordpress-toolbox/master/snippets/snippets.json \
  | sed -nE -e 's/.*(Constant): ([^"]+).*/"\2"/p' \
  | sed '/^$/d' | sed '$!s/$/,/' \
  > wp-consts.csv