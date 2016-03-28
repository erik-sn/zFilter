import React, { Component } from 'react'

import { GET_OPTIONS } from '../actions/actions'

export default function(state = [], action) {
    switch (action.type) {
        case GET_OPTIONS:
            if(!action.payload.data) return []
            return action.payload.data
    }
    return state
}


