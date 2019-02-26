const web3Handler = require('../web3Handler/ropstenHandler');

module.exports = {
  getProjectsFromOrganizationName: (req, res)=> {
    web3Handler.getProjectsFromOrganizationName(req.body.organizationName).then(projects=> {
      let projectList=[];
      for(let i=0; i<projects.length; i++){
        let projectJson= new Object();
        projectJson.contractAddress=projects[i][0];
        projectJson.name=projects[i][1];
        projectJson.description=projects[i][2];
        projectJson.organizationName=projects[i][3];
        projectList.push(projectJson);
      }
      res.send({projectList: projectList});
    })
  },

  getEventsFromContractAddress: (req, res) => {
    web3Handler.getEventsFromContractAddress(req.body.contractAddress).then(events => {
      console.log(events);
    });
  }
}
