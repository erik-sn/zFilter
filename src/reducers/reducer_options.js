import React, { Component } from 'react'

import { GET_OPTIONS } from '../actions/actions'
import { RESET_OPTIONS } from '../actions/actions'

export default function(state = [], action) {
    switch (action.type) {
        case GET_OPTIONS:
          console.log(action.payload.data)
          return action.meta.options.concat(action.payload.data)

        case RESET_OPTIONS:
          return []
    }
    return state
}


