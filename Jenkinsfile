pipeline {    
    agent any
    environment {
        PROJECT_ID = 'oss-fall'
        CLUSTER_NAME = 'k8s'
        LOCATION = 'asia-northeast3-a'
        CREDENTIALS_ID = 'gke'
    }
    stages {
        stage("Checkout code") {
            steps {
                checkout scm
            }
        }
        stage("Build image") {
            steps {
                script {
                    myapp = docker.build("sungone/oss-cub:latest}")
                }
            }
        }
        stage("Push image") {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                            myapp.push("latest")
                            myapp.push("${env.BUILD_ID}")
                    }
                }
            }
        }        
        stage('Deploy to GKE') {
            steps{
                sh "sed -i 's/sungone/oss-cub:latest/g' deployment.yaml"
                step([$class: 'KubernetesEngineBuilder', projectId: oss-fall, clusterName: k8s, location: asia-northeast-3-a, manifestPattern: 'deployment.yaml', credentialsId: gke, verifyDeployments: true])
            }
        }
    }
}
