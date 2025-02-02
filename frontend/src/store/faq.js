import {create} from "zustand"
export const useFAQStore = create((set)=>({
    FAQs : [],
    setFAQ : (FAQs)=>set({FAQs}),
    getFAQs : async (language="en")=>{
        const res=await fetch(`/api/faq?lang=${language}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await res.json()
        set({FAQs:data})
    },
    createFAQ : async(newFAQ)=>{
        const res = await fetch("/api/faq/admin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newFAQ)
        })
        const data=await res.json()
        console.log(data)
        set(prevState=>({ FAQs:[...prevState.FAQs, data]} ))
    },

    deleteFAQ : async(faqId)=>{
        const res = await fetch(`/api/faq/admin/${faqId}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data  = await res.json()
        set(prevState =>({
            FAQs : prevState.FAQs.filter((FAQ)=>FAQ._id!=faqId)
        }))
    }
}))