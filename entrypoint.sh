for file in $(find /usr/share/nginx/html -type f);
do
  cp $file $file.tmpl
  envsubst "`printf '${%s} ' $(env | grep 'REACT_APP_\|NODE_ENV' | cut -d'=' -f1)`" < $file.tmpl > $file
  rm -f $file.tmpl
done
nginx -g 'daemon off;'
