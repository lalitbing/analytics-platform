import { Request, Response, NextFunction } from 'express';
import { supabase } from '../db/supabase';

export const verifyApiKey = async (req:any,res:any,next:any)=>{
    const key = req.header("x-api-key")
  
    if(!key){
      console.log("❌ NO API KEY")
      return res.status(401).json({error:"API key missing"})
    }
  
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("api_key", key)
      .single()
  
    if(!data){
      console.log("❌ INVALID KEY")
      return res.status(403).json({error:"Invalid API key"})
    }
  
    req.project = data
    next()
  }
  
