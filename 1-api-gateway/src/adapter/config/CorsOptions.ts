


const corsOptions:ICorsOptions={
 origin: [ process.env.AUTH_URL as string],
 methods:['GET','POST','PATCH','DELETE','OPTIONS','HEAD'],
 allowedHeaders:[
  "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
 ]


}

 interface ICorsOptions {
  origin?:  string[];
  methods?: string | string[];
  allowedHeaders?: string | string[];
  exposedHeaders?: string | string[];
  credentials?: boolean;
  maxAge?: number;
  preflightContinue?: boolean;
  optionsSuccessStatus?: number;
}

export  {corsOptions , ICorsOptions}