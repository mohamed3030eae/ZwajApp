import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
//مفتش الاخطاء
@Injectable()
export class  ErrorInterceptor  implements HttpInterceptor{
intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{

    return next.handle(req).pipe(
     catchError(error => {
    if(error instanceof HttpErrorResponse)
    {
        const applicationError=error.headers.get("Application-Error");
        if(applicationError){
            console.error(applicationError);
            return throwError(applicationError);
        }
        //ModelState Error
        const serverError=error.error;
        let modelStateError='';
        if(serverError && typeof serverError ==='object'){
        for(const key in serverError){
           if (serverError [key]) {
            modelStateError+=serverError[key]+ '\n';
                     }
        }

        }
        //Unauthorized Errors
        if (error.status===401) {
            return throwError(error.statusText);
        }

        return throwError(modelStateError || serverError  ||  'Server Error')
        
    }
}
)
    )


}

    
}


export const ErrorInterceptorProvidor ={
    provide:HTTP_INTERCEPTORS,
    useClass:ErrorInterceptor,
    multi:true
}