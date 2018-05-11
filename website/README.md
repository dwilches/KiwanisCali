# KiwanisCali
Fundación Kiwanis Sultana del Valle - Cali

##Para construir y subir:

### Con imágenes
    ng build --prod -op docs && gsutil cp -r docs/* gs://www.kiwaniscali.org

### Sin imágenes
    ng build --prod -op docs && gsutil cp docs/* gs://www.kiwaniscali.org


## Para configurar el bucket con permiso de lectura pública:

    gsutil defacl set public-read gs://www.kiwaniscali.org
    gsutil acl ch -u AllUsers:R gs://www.kiwaniscali.org
    gsutil web set -m index.html -e index.html gs://www.kiwaniscali.org 

## Para configurar la Google Cloud Function:

    cd cloud-functions/contact-form 
    gcloud beta functions deploy sendMail --trigger-http
    gcloud beta functions describe sendMail

