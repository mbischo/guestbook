dataSource {
    pooled = true
    driverClassName = "com.mysql.jdbc.Driver"

    properties {
        maxActive = 50
        maxIdle = 25
        minIdle = 5
        initialSize = 5
        maxWait = 5000
        minEvictableIdleTimeMillis = 1000 * 60 * 30 //30 minutes
        timeBetweenEvictionRunsMillis = 1000 * 60 * 30 //30 minutes
        numTestsPerEvictionRun = 3
        testOnBorrow = true
        testWhileIdle = false
        testOnReturn = false
        validationQuery = "select 1;"
    }
    //loggingSql = true
}
hibernate {
    cache.use_second_level_cache = true
    cache.use_query_cache = false
    cache.region.factory_class = 'net.sf.ehcache.hibernate.EhCacheRegionFactory'
}
// environment specific settings
environments {
    development {
        dataSource {
            dbCreate = "none" // one of 'create', 'create-drop','update'
            url = "jdbc:mysql://vagrant.moolb.com/bloomguest?autoReconnect=true"
            username = "bloomguest"
            password = "password"

        }
    }
    test {
        dataSource {
            dbCreate = "update"
            url = "jdbc:h2:mem:testDb;MVCC=TRUE;LOCK_TIMEOUT=10000"
        }
    }
    production {
        dataSource {
            dbCreate = "update"
            url = "jdbc:h2:prodDb;MVCC=TRUE;LOCK_TIMEOUT=10000"
            pooled = true
            properties {
               maxActive = -1
               minEvictableIdleTimeMillis=1800000
               timeBetweenEvictionRunsMillis=1800000
               numTestsPerEvictionRun=3
               testOnBorrow=true
               testWhileIdle=true
               testOnReturn=true
               validationQuery="SELECT 1"
            }
        }
    }
}
