# KiwanisCali
Fundación Kiwanis Sultana del Valle - Cali

## Autenticarse con GCloud para usar el CLI
    gcloud auth login

## Compilar la página
    ng build --prod -op docs

### Subir sin imágenes
    gsutil cp docs/* gs://www.kiwaniscali.org

### Subir con imágenes
    gsutil cp -r docs/* gs://www.kiwaniscali.org

### Subir sólo una de las carpetas de imágenes
    gsutil cp -r docs/assets/news-2/* gs://www.kiwaniscali.org/assets/news-2 

## Para configurar el bucket con permiso de lectura pública:

    gsutil defacl set public-read gs://www.kiwaniscali.org
    gsutil acl ch -u AllUsers:R gs://www.kiwaniscali.org
    gsutil web set -m index.html -e index.html gs://www.kiwaniscali.org 

## Para configurar la Google Cloud Function:

    cd cloud-functions/contact-form 
    gcloud beta functions deploy sendMail --trigger-http
    gcloud beta functions describe sendMail

