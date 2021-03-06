#!/bin/bash
set -e

to=$1
shift

code=$(timeout "$to" docker wait "$cont" || true)
docker kill $cont &> /dev/null
echo -n 'status: '
if [ -z "$code" ]; then
	echo timeout
    else 
        echo exited: $code
fi

echo output:
docker logs $cont | sed 's/^/\t/'
docker rm $cont &> /dev/null
