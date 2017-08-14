import Router from 'koa-router';
import fs from 'fs';
import path from 'path';

const index = new Router({})

index.get('*', async (ctx, next) => {
  // let indexHtmlFile = await (new Promise(function(resolve, reject){
  //     fs.readFile(path.join(__dirname, '../../client/dist/index.html'), (err, data) => {
  //       if (err){
  //         reject(err);
  //       }else{
  //         resolve(data);
  //       }
  //     });
  // }))

  // ctx.type = 'html';
  // ctx.body = indexHtmlFile;
  await ctx.send(ctx, 'index.html', { root: __dirname + '/../../client/dist'})
});


export default index;
