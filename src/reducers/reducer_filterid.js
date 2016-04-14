import React, { Component } from 'react'

import { INCREMENT_FILTERID } from '../actions/actions'

export default function(state = 1, action) {
    switch (action.type) {
        case INCREMENT_FILTERID:
          return state + 1
    }
    return state
}


