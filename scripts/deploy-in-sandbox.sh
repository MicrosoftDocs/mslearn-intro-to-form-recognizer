# Define the zip file we are going to deploy for this module
sourceZip=https://raw.githubusercontent.com/MicrosoftDocs/mslearn-intro-to-form-recognizer/main/build-artifacts/prod/FormRecognizer.zip

# Get the zip file
curl $sourceZip --output source.zip

# Get and set the subscription and RG
subscription=$(az account list --query [0].id -o tsv)
resourceGroupName=$(az group list --query "[0] | name" -o tsv)

# Create appservice plan
appServiceName=fr-$resourceGroupName
az appservice plan create --name $appServiceName --resource-group $resourceGroupName --sku FREE

# Create Azure Cogntive Services account and put key and endpoint into variables
az cognitiveservices account create \
    --name form-recognizer-resource \
    --resource-group $resourceGroupName \
    --kind FormRecognizer \
    --sku S0 \
    --location westus \
    --subscription $subscription\
    --yes
apiKey=$(az cognitiveservices account keys list -g $resourceGroupName -n form-recognizer-resource --query [key1] -o tsv)
endpoint=https://westus2.api.cognitive.microsoft.com/

# create the webapp
webAppName=fr-$resourceGroupName
az webapp create \
    --resource-group $resourceGroupName \
    --plan $appServiceName \
    --name $webAppName

# add the appsettings to the webapp
az webapp config appsettings set \
    --resource-group $resourceGroupName \
    --name $webAppName \
    --settings FormRecognizer:Endpoint=$endpoint FormRecognizer:ApiKey=$apiKey

# deploy to webapp
az webapp deployment source config-zip \
    --resource-group $resourceGroupName \
    --name $webAppName \
    --src source.zip

echo https://$webAppName.azurewebsites.net
echo "Select the hyperlink above to see Form Recognizer in action"
