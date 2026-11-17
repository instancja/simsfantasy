"use client";

import {useFormStatus} from "react-dom";

type Props={
 label:string;
 pendingLabel:string;
 className?:string;
};

export function PendingSubmitButton({label,pendingLabel,className="primaryButton"}:Props){
 const {pending}=useFormStatus();
 return <button className={className+" pendingSubmit"} type="submit" disabled={pending} aria-disabled={pending}>
  {pending&&<span className="loadingSpinner" aria-hidden="true"/>}
  <span>{pending?pendingLabel:label}</span>
 </button>;
}

export function PendingStatus({message}:{message:string}){
 const {pending}=useFormStatus();
 if(!pending)return null;
 return <div className="aiPendingNotice" role="status" aria-live="polite">
  <span className="loadingSpinner" aria-hidden="true"/>
  <span><strong>AI is thinking…</strong><small>{message}</small></span>
 </div>;
}
