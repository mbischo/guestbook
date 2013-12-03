package com.bloomhealthco.guestbook

import grails.rest.Resource

@Resource(uri='/employees', formats=['json'])
class Employee {

    String firstName
    String lastName
    String email
    Boolean deleted

    static constraints = {
        firstName(nullable: true, maxSize: 255)
        lastName(nullable: false, maxSize: 255)
        email(email: true, maxSize: 255)
    }
}
