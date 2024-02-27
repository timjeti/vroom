export PROJECT_ID=self-savari
export REGION=us-central1
export CONNECTION_NAME=self-savari:us-central1:jaawo

# gcloud builds submit \
#   --tag gcr.io/$PROJECT_ID/poll \
#   --project $PROJECT_ID

gcloud run deploy poll \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --add-cloudsql-instances $CONNECTION_NAME \
  --project $PROJECT_ID