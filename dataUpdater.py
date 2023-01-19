import json
import sys

def getData(filename):
    with open(filename, 'r') as f:
        data = json.load(f)
    return data

{"Capability":"Forecasting","Features":"Personal Planner","ASPECT":"2","CXOne":"0","NICE":"3","Verint":"2","Calabrio":"1","Genesys Engage":"","Genesys Cloud":"0","AWS":"3","Playvox":"2"}

def convertFeaturesData(data):
    newData = {}
    features = {}
    featureName=""
    capabilityName=""
    for row in data:
        for key in row:
            if(key == "Capability" and row[key] != ""):
                if (capabilityName!=""):
                    newData[capabilityName] = features
                features = {}
                capabilityName = row[key]
            elif(key == "Features"):
                featureName = row[key]
                features[featureName]=[]
            else:
                if(row[key]!=""):
                    features[featureName].append(row[key])
    newData[capabilityName]=features
    return newData

def convertActivitiesData(data):
    newData = []
    newRow = []
    for row in data:
        if (newRow != []):
            newData.append(newRow)
        newRow=[]
        for key in row:
            val = row[key]
            newRow.append(val)
    newData.pop(0)
    return newData


def saveData(data, filename):
    with open(filename, "w") as outfile:
        json.dump(data, outfile)

def convertCapabilitiesData(data):
    return data

def updateCapabilitiesData():
    data = getData('capabilitiesDataRaw.json')
    data = convertCapabilitiesData(data)
    saveData(data, './src/capabilitiesData.json')

def updateActivitiesData():
    data = getData('activitiesDataRaw.json')
    data = convertActivitiesData(data)
    saveData(data, './src/activitiesData.json')

def updateFeaturesData():
    data = getData('featuresDataRaw.json')
    data = convertFeaturesData(data)
    saveData(data, './src/featuresData.json')

if __name__ == '__main__':
    if (len(sys.argv) == 1) :
        updateCapabilitiesData()
        updateFeaturesData()
        updateActivitiesData()
    else:
        for i in range(1,len(sys.argv)):
            if(int(sys.argv[i]) == 1):
                updateCapabilitiesData()
            elif(int(sys.argv[i]) == 2):
                updateFeaturesData()
            elif(int(sys.argv[i]) == 3):
                updateActivitiesData()
            else:
                print("Invalid command line Argument.\nAdd '1' for updating capabilitiesData.\nAdd '2' for updating featuresData.\nAdd '3' for updating activitiesData.")