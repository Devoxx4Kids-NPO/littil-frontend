Feature: Manage the lifecycle of a teacher profile

  Background:
    * configure cors = true
    * def id = 1
    * configure responseDelay = 1600

  Scenario: methodIs('get') && pathMatches('/api/v1/teacher/{id}')
    * def response = cache[pathParams.id]

  Scenario: methodIs('get') && pathMatches('/api/v1/teacher')
    * def response = $cache.*

  Scenario: methodIs('post') && pathMatches('/api/v1/teacher')
    * def c = request
    * def id = ~~(id + 1)
    * c.id = id
    * def response = c

  Scenario: methodIs('put') && pathMatches('/api/v1/teacher')
    * def entity = request
    * cache[entity.id] = entity
    * def response = entity

  Scenario: methodIs('delete') && pathMatches('/api/v1/teacher')
    * def entity = request
    * eval delete cache[entity.id]
    * def response = entity
