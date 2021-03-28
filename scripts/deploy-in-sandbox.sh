# Define the zip file we are going to deploy for this module
sourceZip=https://cognitiveserviceshowcase.blob.core.windows.net/build-artifacts/FormRecognizer.zip

# Get and set the subscription and RG
subscription=$(az account list --query [0].id -o tsv)
resourceGroupName=$(az group list --query "[0] | name" -o tsv)

# Create Azure Cogntive Services account and put key and endpoint into variables
az cognitiveservices account create \
    --name form-recognizer-resource \
    --resource-group $resourceGroupName \
    --kind FormRecognizer \
    --sku S0 \
    --location westus2 \
    --subscription $subscription\
    --yes
apiKey=$(az cognitiveservices account keys list -g cognitive-services-resource-group -n form-recognizer-resource --query [key1] -o tsv)
endpoint=https://westus2.api.cognitive.microsoft.com/

# create the webapp
webAppName=form-recognizer-$RANDOM
az webapp create \
    --resource-group $resourceGroupName \
    --plan F1 \
    --name $webAppName

# add the appsettings to the webapp
az webapp config appsettings set \
    --resource-group $resourceGroupName \
    --name $webAppName \
    --settings FormRecognizer:Endpoint=$endpoint FormRecognizer:ApiKey=$apiKey

# download the source files and deploy to the webapp
curl sourceZip --output clouddrive/Source.zip
az webapp deployment source config-zip \
    --resource-group $resourceGroupName \
    --name $webAppName \
    --src clouddrive/Source.zip
