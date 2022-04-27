pipeline{
    agent any
    triggers {
        pollSCM("* * * * *")
    }
    stages{
        stage("Build backend"){
            steps{
            echo "Building backend"
                dir("backend-travel-blog") {
                  sh "npm update"
                  sh "npm run build"
               }
            }
        }
    }
}