import React from 'react'
import ComparisonForm from './ComparisonForm';
import Header from './Header'
import TableHeader from './Table/TableHeader'
import TablePartiton from './Table/TablePartiton';

const FeaturesAssessmentDashboard = () => {

    let comparisons = ["AWS","GCP"];
    let WFMdata = {"Forecasting" : [25,30]};
    let integrationDeploymentData = {"Integration with 3rd Party tools" : [25,30]};
    let webPortalData = {"User Friendliness of Web Portal" : [25,30]};
    
  return (
    <>
    <Header heading={"FEATURES ASSESSMENT - Market Leaders"}/>
    <ComparisonForm comparisonKeys={comparisons}/>
    <table>
        <TableHeader headings={["CAPABILITY ASSESSMENT", ...comparisons]}/>
        <tbody>
            <TablePartiton breakText = {"WFM Capabilities"} dataArray = {WFMdata}/>
            <TablePartiton breakText = {"Integration & Deployment"} dataArray = {integrationDeploymentData}/>
            <TablePartiton breakText = {'Web Portal & Employment Self-Service'} dataArray = {webPortalData}/>
        </tbody>
    </table>
</>
  )
}

export default FeaturesAssessmentDashboard