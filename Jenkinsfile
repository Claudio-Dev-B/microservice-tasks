pipeline {
    agent any
    environment {
        DOCKER_CREDS = credentials('docker-hub-creds')
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', 
                url: 'https://github.com/Claudio-Dev-B/microservice-tasks.git'
            }
        }
        stage('Test') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t microservice-tasks:${BUILD_ID} .'
            }
        }
        stage('Deploy to EC2') {
            steps {
                sh '''
                docker stop microservice-tasks || true
                docker rm microservice-tasks || true
                docker run -d -p 3000:3000 --name microservice-tasks microservice-tasks:${BUILD_ID}
                '''
            }
        }
    }
    post {
        always {
            cleanWs()
        }
        success {
            echo '🚀 Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed!'
        }
    }
}