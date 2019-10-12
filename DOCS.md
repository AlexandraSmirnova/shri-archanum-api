## API состоит из следующих HTTP-запросов:

Примечание commitHash == branchName

<b>GET /api/repos</b>

Возвращает массив репозиториев, которые имеются в папке.

<b>GET /api/repos/:repositoryId/commits/:commitHash</b>

Возвращает массив коммитов в данной ветке (или хэше коммита) вместе с датами их создания и названием.

<b>GET /api/repos/:repositoryId/commits/:commitHash/diff</b>

Возвращает diff коммита в виде строки.

<b>GET /api/repos/:repositoryId(/tree/:commitHash/:path)</b>

Возвращает содержимое репозитория по названию ветки (или хэшу комита). Параметр repositoryId - название репозитория (оно же - имя папки репозитория). То, что в скобках - опционально, если отсутствует и branchName, и path - отдать актуальное содержимое в корне в главной ветке репозитория.

Примеры:

/api/repos/cool-timer

/api/repos/cool-timer/tree/cool-branch/src/components

/api/repos/cool-timer/tree/master/src/components

/api/repos/cool-timer/tree/e1r2r32b321bdad2e1knbh231/src/components

<b>GET /api/repos/:repositoryId/blob/:commitHash/:pathToFile</b>

Возвращает содержимое конкретного файла, находящегося по пути pathToFile в ветке (или по хэшу коммита) branchName. С используемой памятью должно быть все в порядке.

Примеры:

/api/repos/cool-timer/blob/cool-branch/src/components/Header/index.tsx

<b>DELETE /api/repos/:repositoryId</b>

Безвозвратно удаляет репозиторий

<b>POST /api/repos + { url: ‘repo-url’ }</b>

Добавляет репозиторий в список, скачивает его по переданной в теле запроса ссылке и добавляет в папку со всеми репозиториями.