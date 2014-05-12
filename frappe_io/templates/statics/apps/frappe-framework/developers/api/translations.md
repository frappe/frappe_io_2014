This document shows how to translations are managed in ERPNext and how to add
a new language or update translations of an existing language.

### Source

Translatable text exists in 3 main sources:

  1. Javascript Code Files (both framework and application)
  2. Python Code Files
  3. DocTypes (names, labels and select options)

#### Strings in Code Files

Strings in code files are annotated using the `_` (underscore) method

  1. In Python it is the `webnotes._` method. Example:

webnotes._("This string must be translated")

  2. In Javascript it is the `wn._` method. Example:

`wn._("This string must be translated")`

### How Translations Are Picked up During Execution

Whenever a translation is called via the _ method, the entire translation
dictionaries from all apps are built and stored in memcache.

Based on the user preferences or request preferences, the appropriate
translations are loaded at the time of request on the server side. Or if
metadata (DocType) is queried, then the appropriate translations are appended
when the DocType data is requested.

The underscore `_` method will replace the strings based on the available
translations loaded at the time.

### Building Translations

1. To find untranslated strings, run `frappe --get_untranslated [lang] [path]`
1. Add the translated strings in another file in the same order
1. run `frappe --update_translations [lang] [path of untranslated strings] [path of translated strings]`

#### Updating Sources:

If you find translatable strings are not properly annotated using the `_`
method, you can add them in the code and rebuild the translations.

#### Improving Translations:

To improve an existing translation, just edit the master translation files in
the `translations` of each app

> Please contribute your translations back to ERPNext by sending us a Pull
Request.

