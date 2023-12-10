export interface IRoute {
    path: string,
    key: string,
    component: JSX.Element,
    label?: string,
  }
  export interface IVacation {
    vcnId:string;
    destination: string;
    about: string;
    fromDate: string;
    toDate: string;
    price: number;
    imageSrc: string;
    followers: number;
  }
  export interface IToken {
    userName: string;
    role: string;
    iat: number;
    exp: number;
  }

  export interface IFollow {
    email: string;
    vcnId: number;
  }
  export interface IUser {
    firstName:string,
    lastName:string,
    email:string, 
    pswrd:string, 
    userRole:string
  }
  export interface  ILogin {
    userRole: string;
    result: IResult[][];
    signedToken: string;
  }
  interface IResult {
    pswrd: string;
    _buf: I_buf;
    _clientEncoding: string;
    _catalogLength: number;
    _catalogStart: number;
    _schemaLength: number;
    _schemaStart: number;
    _tableLength: number;
    _tableStart: number;
    _orgTableLength: number;
    _orgTableStart: number;
    _orgNameLength: number;
    _orgNameStart: number;
    characterSet: number;
    encoding: string;
    name: string;
    columnLength: number;
    columnType: number;
    type: number;
    flags: number;
    decimals: number;
  }
  
  interface I_buf {
    type: string;
    data: number[];
  }
  
  export interface IError {
    status: number;
    data: IErrorData;
  }
  
 interface IErrorData {
    status: string;
    message: IErrorMessage;
  }
  
interface IErrorMessage {
  }
  