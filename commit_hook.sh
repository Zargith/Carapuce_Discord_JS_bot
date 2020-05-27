#!/bin/sh

test -n "$(grep '(feat \?\|fix \?\|add \?\|doc \?\|del \?\|depl \?\|test \?\|wip \?\|refac \?\|assets \?)*:' ${1})" || {
	echo >&2 "ERROR: Commit message should be prefixed with feat, fix, add, doc, del, depl, test, wip, refac, assets"
	exit 1
}

line=$(head -n 1 ${1})
count=${#line}
description=$(head -n 1 ${1} | cut -d ":" -f 2)

if [ -z "$description" ]; then
	echo >&2 "Error: a description is mandatory"
	exit 1
fi

if [ $count -gt 50 ]; then
	echo >&2 "ERROR: The first line should not be more than 50 characters long"
	exit 1
fi

lineCount=$(cat ${1} | wc -l)

if [ $lineCount -ne 1 ]; then
	grep -i "BREAKING CHANGE" ${1} > /dev/null
	if [ $? -eq 0 ]; then
		test -n "$(grep "BREAKING CHANGE:" ${1})" || {
			echo >&2 "ERROR: BREAKING CHANGE should be uppercase and followed by a semicolon"
			exit 1
		}
	fi
fi

echo "Your Commit message is deemed worthy"

exit 0


## tag empty line works