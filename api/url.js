// const url = "https://api.brandstore.uz"

let url = "https://api.rrpo.uz";

if(process.env.NODE_ENV === 'development') {
   url = "https://api.eletron.uz"
}
else if(process.env.NODE_ENV === 'production') {
   url = "https://api2.eletron.uz"
}


export default url;
