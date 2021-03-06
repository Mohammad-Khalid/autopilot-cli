

const deleteAssistantFully = async (assistantIdentifier,profile) => {

  const client = await require('./client')(profile);

  return await Promise.resolve()

    // get the assistant
    .then(() => {
      return client.autopilot
        .assistants(assistantIdentifier);
    })

    //remove samples
    .then( async (assistant) => {

        return await client.autopilot
        .assistants(assistantIdentifier)
        .tasks
        .list()
        .then( async (tasks) => {
          if(tasks.length){
            for( let i = 0 ; i < tasks.length ; i++){
                await client.autopilot
                .assistants(assistantIdentifier)
                .tasks(tasks[i].sid)
                .samples
                .list()
                .then ( async (samples) => {
                    for( let j = 0 ; j < samples.length ; j++){
                      await client.autopilot
                        .assistants(assistantIdentifier)
                        .tasks(tasks[i].sid)
                        .samples(samples[j].sid)
                        .remove()
                        .catch((err) => {
                          console.log(err.message);
                        })
                    }
                })
              if(i === tasks.length-1){
                  return assistant;
              }
            }
          }else{
            return assistant;
          }
        })
    })

    //remove fields
    .then(async (assistant) => {

        return await client.autopilot
        .assistants(assistantIdentifier)
        .tasks
        .list()
        .then( async (tasks) => {
          if(tasks.length){
            for( let i = 0 ; i < tasks.length ; i++){
                await client.autopilot
                .assistants(assistantIdentifier)
                .tasks(tasks[i].sid)
                .fields
                .list()
                .then ( async (fields) => {
                    for( let j = 0 ; j < fields.length ; j++){
                      await client.autopilot
                        .assistants(assistantIdentifier)
                        .tasks(tasks[i].sid)
                        .fields(fields[j].sid)
                        .remove()
                        .catch((err) => {
                          console.log(err.message);
                        })
                    }
                })
              if(i === tasks.length-1){
                  return assistant;
              }
            }
          }else{
            return assistant;
          }
        })
    })

    //remove custom field type values
    .then(async (assistant) => {

      return await client.autopilot
      .assistants(assistantIdentifier)
      .fieldTypes
      .list()
      .then( async (fieldTypes) => {
        if(fieldTypes.length){
          for( let i = 0 ; i < fieldTypes.length ; i++){
              await client.autopilot
              .assistants(assistantIdentifier)
              .fieldTypes(fieldTypes[i].sid)
              .fieldValues
              .list()
              .then ( async (fieldValues) => {
                  for( let j = 0 ; j < fieldValues.length ; j++){
                    await client.autopilot
                    .assistants(assistantIdentifier)
                    .fieldTypes(fieldTypes[i].sid)
                    .fieldValues(fieldValues[j].sid)
                    .remove()
                    .catch((err) => {
                      console.log(err.message);
                    })
                  }
              })
            if(i===fieldTypes.length-1){
              return assistant;
            }
          }
        }else{
          return assistant;
        }
      })
  })

  .then (async (assistant) => {
    
    return await client.autopilot
      .assistants(assistantIdentifier)
      .fieldTypes
      .list()
      .then( async (fieldTypes) => {
        if(fieldTypes.length){
          for( let i = 0 ; i < fieldTypes.length ; i++){
              await client.autopilot
                .assistants(assistantIdentifier)
                .fieldTypes(fieldTypes[i].sid)
                .remove()
                .catch((err) => {
                  console.log(err.message);
                })
            if(i === fieldTypes.length-1){
              return assistant;
            }
          }
        }else{
          return assistant;
        }
      })
  })
    //remove tasks
    .then( async (assistant) => {

      await client.autopilot
      .assistants(assistantIdentifier)
      .tasks
      .list()
      .then( async (tasks) => {
          for( let i = 0 ; i < tasks.length ; i++){
            await client.autopilot
              .assistants(assistantIdentifier)
              .tasks(tasks[i].sid)
              .remove()
              .catch((err) => {
                console.log(err.message);
              });
            }
      });

      await client.autopilot
        .assistants(assistantIdentifier)
        .modelBuilds
        .list().then(async (modelBuilds) => {
          for(let i=0 ; i<modelBuilds.length ; i++){
            await client.autopilot
            .assistants(assistantIdentifier)
            .modelBuilds(modelBuilds[i].sid)
            .remove()
            .catch((err) => {
              console.log(err.message);
            });
          }
        })
    return await assistant;
  })

    //remove assistant
    .then(async (assistant) => {
      return await client.autopilot
        .assistants(assistantIdentifier)
        .remove();
    })

    // retry on error
    .catch(err => {
      throw err;
    })

}

module.exports = { deleteAssistantFully };