const ta = require('../lib/twilio-assistant');
const ora = require('ora');

module.exports = async (args) => {

  try {
    const profile = args.profile || "default";

    const spinner = await ora().start('Getting assistants...\n')
    const assistants = await ta.listAssistants(profile);

    for( let i = 0 ; i < assistants.length ; i++){
        console.log(`${assistants[i].sid} ${assistants[i].uniqueName}`)
        if(i === assistants.length - 1){
            spinner.stop();
        }
    }


  } catch (err) {
    spinner.stop()
    
    console.error(err)
  }
}