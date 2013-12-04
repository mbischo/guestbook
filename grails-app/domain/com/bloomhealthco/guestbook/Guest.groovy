package com.bloomhealthco.guestbook

import grails.rest.*

@Resource(uri='/guests', formats=['json'])
class Guest {

    String name
    String company
    Date checkinTime
    Date checkoutTime
    Employee visitedEmployee

    static constraints = {
        checkoutTime(nullable: true)
    }

    static mapping = {
        visitedEmployee column: 'visiting_id'
    }
}
