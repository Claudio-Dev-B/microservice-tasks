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
            post {
                always {
                    junit 'reports/**/*.xml'  // Relatório de testes (opcional)
                }
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
        
        stage('Smoke Test') {
            steps {
                sh '''
                sleep 5  # Aguardar app iniciar
                curl -f http://localhost:3000/health || exit 1
                '''
            }
        }
    }
    
    post {
        always {
            cleanWs()
            script {
                // Limpar containers e imagens antigas
                sh 'docker system prune -f || true'
            }
        }
        success {
            echo '🎉 Pipeline successful! Microservice deployed and tested!'
            // slackSend channel: '#deployments', message: "✅ Deployment successful: ${env.BUILD_URL}"
        }
        failure {
            echo '❌ Pipeline failed! Check logs for details.'
            // slackSend channel: '#deployments', message: "❌ Deployment failed: ${env.BUILD_URL}"
        }
    }
}