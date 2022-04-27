pipeline{
    agent any
    triggers {
        pollSCM("H/5 * * * *")
    }
    stages{
        stage("Build backend"){
            steps{
            echo "Building backend"
            }
        }
    }
}