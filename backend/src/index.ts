import colors from 'colors';
import server from './server';


const PORT = process.env.PORT || 4000;

server.listen(PORT,()=>{
    console.log(colors.bgBlue.black.italic( `Server is running on port: ${PORT}`));
    
})
//npx kill-port 4000