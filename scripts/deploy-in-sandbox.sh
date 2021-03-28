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
key=a8407e60ea674b058d3726e9e983200b
endpoint=https://westus2.api.cognitive.microsoft.com/


# create the webapp
webAppName=form-recognizer-$RANDOM
az webapp create \
    --resource-group $resourceGroupName \
    --plan F1 \
    --name $webAppName

# download the source files and deploy to the webapp
curl https://cognitiveserviceshowcase.blob.core.windows.net/build-artifacts/FormRecognizer.zip --output clouddrive/Source.zip
az webapp deployment source config-zip \
    --resource-group $resourceGroupName \
    --name $webAppName \
    --src clouddrive/Source.zip

# add the appsettings to the webapp
az webapp config appsettings set \
    --resource-group MyResourceGroup \
    --name MyUniqueApp \
    --settings FormRecognizer:Endpoint=$endpoint FormRecognizer:Endpoint=$key
