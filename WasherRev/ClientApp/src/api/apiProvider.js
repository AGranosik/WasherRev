import axios from 'axios';
import React from 'react';

export default function apiProvider(token){
    return axios.create({
        headers: {
            "Authorization" : `Bearer ${token}`
        }
    });
};