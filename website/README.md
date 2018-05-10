# KiwanisCali
Fundación Kiwanis Sultana del Valle - Cali

##Para construir y subir:

### Con imágenes
    ng build --prod -op docs && gsutil cp -r docs/* gs://www.kiwaniscali.org

### Sin imágenes
    ng build --prod -op docs && gsutil cp docs/* gs://www.kiwaniscali.org
