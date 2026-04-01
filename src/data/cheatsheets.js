// ── Cheatsheets Data ──────────────────────────────────
// Curated collection of developer cheatsheets with commands,
// syntax references, and quick lookups.

export const cheatsheetCategories = [
  { id: 'all', name: 'All Cheatsheets', shortName: 'All', emoji: '📋', description: 'All cheatsheets' },
  { id: 'version-control', name: 'Version Control', shortName: 'VCS', emoji: '🔀', description: 'Git, GitHub CLI, SVN' },
  { id: 'containers-devops', name: 'Containers & DevOps', shortName: 'DevOps', emoji: '🐳', description: 'Docker, K8s, Terraform' },
  { id: 'cloud', name: 'Cloud CLIs', shortName: 'Cloud', emoji: '☁️', description: 'AWS, Azure, GCP CLIs' },
  { id: 'linux-shell', name: 'Linux & Shell', shortName: 'Linux', emoji: '🐧', description: 'Bash, Vim, SSH' },
  { id: 'languages', name: 'Languages', shortName: 'Langs', emoji: '💻', description: 'JS, Python, Go, Rust, SQL' },
  { id: 'frameworks', name: 'Frameworks', shortName: 'FW', emoji: '⚛️', description: 'React, Next.js, Tailwind' },
  { id: 'databases', name: 'Databases', shortName: 'DB', emoji: '🗄️', description: 'PostgreSQL, Redis, MongoDB' },
  { id: 'networking', name: 'Networking', shortName: 'Net', emoji: '🌐', description: 'HTTP, curl, DNS' },
  { id: 'security', name: 'Security', shortName: 'Sec', emoji: '🔐', description: 'OpenSSL, JWT, OAuth' },
  { id: 'ai-ml', name: 'AI & ML', shortName: 'AI', emoji: '🤖', description: 'NumPy, Pandas, PyTorch' },
  { id: 'markdown-docs', name: 'Markdown & Docs', shortName: 'Docs', emoji: '📝', description: 'Markdown, JSDoc, MDX' },
]

export const cheatsheets = [
  // ── VERSION CONTROL ──────────────────────
  {
    id: 'git',
    name: 'Git',
    category: 'version-control',
    emoji: '🔀',
    description: 'Essential Git commands for version control',
    tags: ['git', 'version control', 'branching', 'merge', 'rebase'],
    isPopular: true,
    sections: [
      {
        title: 'Setup & Config',
        commands: [
          { command: 'git init', description: 'Initialize a new Git repository' },
          { command: 'git clone <url>', description: 'Clone a remote repository' },
          { command: 'git config --global user.name "Name"', description: 'Set global username' },
          { command: 'git config --global user.email "email"', description: 'Set global email' },
          { command: 'git config --list', description: 'List all configuration settings' },
        ],
      },
      {
        title: 'Basic Workflow',
        commands: [
          { command: 'git status', description: 'Show working tree status' },
          { command: 'git add <file>', description: 'Stage a file for commit' },
          { command: 'git add .', description: 'Stage all changed files' },
          { command: 'git commit -m "message"', description: 'Commit staged changes' },
          { command: 'git commit --amend', description: 'Amend the last commit' },
          { command: 'git diff', description: 'Show unstaged changes' },
          { command: 'git diff --staged', description: 'Show staged changes' },
        ],
      },
      {
        title: 'Branching',
        commands: [
          { command: 'git branch', description: 'List local branches' },
          { command: 'git branch <name>', description: 'Create a new branch' },
          { command: 'git checkout <branch>', description: 'Switch to branch' },
          { command: 'git checkout -b <name>', description: 'Create and switch to branch' },
          { command: 'git branch -d <name>', description: 'Delete a merged branch' },
          { command: 'git branch -D <name>', description: 'Force delete a branch' },
          { command: 'git merge <branch>', description: 'Merge branch into current' },
          { command: 'git rebase <branch>', description: 'Rebase current onto branch' },
        ],
      },
      {
        title: 'Remote',
        commands: [
          { command: 'git remote -v', description: 'List remotes with URLs' },
          { command: 'git remote add origin <url>', description: 'Add a remote' },
          { command: 'git push origin <branch>', description: 'Push to remote' },
          { command: 'git push -u origin <branch>', description: 'Push and set upstream' },
          { command: 'git pull', description: 'Fetch and merge from remote' },
          { command: 'git fetch', description: 'Download remote changes without merging' },
          { command: 'git push --force-with-lease', description: 'Force push safely' },
        ],
      },
      {
        title: 'History & Undo',
        commands: [
          { command: 'git log --oneline', description: 'Compact commit log' },
          { command: 'git log --graph --oneline', description: 'Visual branch history' },
          { command: 'git reset HEAD~1', description: 'Undo last commit, keep changes' },
          { command: 'git reset --hard HEAD~1', description: 'Undo last commit, discard changes' },
          { command: 'git revert <commit>', description: 'Create a new commit undoing changes' },
          { command: 'git stash', description: 'Stash working changes' },
          { command: 'git stash pop', description: 'Restore stashed changes' },
          { command: 'git cherry-pick <commit>', description: 'Apply a specific commit' },
        ],
      },
    ],
  },
  {
    id: 'github-cli',
    name: 'GitHub CLI',
    category: 'version-control',
    emoji: '🐙',
    description: 'GitHub CLI (gh) commands for repos, PRs, and issues',
    tags: ['github', 'gh', 'cli', 'pull request', 'issues'],
    isPopular: true,
    sections: [
      {
        title: 'Setup',
        commands: [
          { command: 'gh auth login', description: 'Authenticate with GitHub' },
          { command: 'gh auth status', description: 'Check authentication status' },
          { command: 'gh repo clone <owner/repo>', description: 'Clone a repository' },
        ],
      },
      {
        title: 'Repos',
        commands: [
          { command: 'gh repo create <name> --public', description: 'Create a public repo' },
          { command: 'gh repo view', description: 'View repo details' },
          { command: 'gh repo fork <owner/repo>', description: 'Fork a repository' },
          { command: 'gh repo list <owner>', description: 'List repos for a user/org' },
        ],
      },
      {
        title: 'Pull Requests',
        commands: [
          { command: 'gh pr create', description: 'Create a pull request' },
          { command: 'gh pr list', description: 'List open PRs' },
          { command: 'gh pr checkout <number>', description: 'Check out a PR locally' },
          { command: 'gh pr merge <number>', description: 'Merge a PR' },
          { command: 'gh pr review <number> --approve', description: 'Approve a PR' },
          { command: 'gh pr diff <number>', description: 'View PR diff' },
        ],
      },
      {
        title: 'Issues',
        commands: [
          { command: 'gh issue create', description: 'Create an issue' },
          { command: 'gh issue list', description: 'List open issues' },
          { command: 'gh issue close <number>', description: 'Close an issue' },
          { command: 'gh issue view <number>', description: 'View issue details' },
        ],
      },
      {
        title: 'Actions & Workflows',
        commands: [
          { command: 'gh run list', description: 'List workflow runs' },
          { command: 'gh run view <id>', description: 'View run details' },
          { command: 'gh run watch <id>', description: 'Watch a run in real-time' },
          { command: 'gh workflow list', description: 'List workflows' },
          { command: 'gh workflow run <name>', description: 'Trigger a workflow' },
        ],
      },
    ],
  },
  {
    id: 'svn',
    name: 'SVN (Subversion)',
    category: 'version-control',
    emoji: '📂',
    description: 'Apache Subversion version control commands',
    tags: ['svn', 'subversion', 'version control', 'centralized'],
    isPopular: false,
    sections: [
      {
        title: 'Basic Operations',
        commands: [
          { command: 'svn checkout <url>', description: 'Check out a working copy' },
          { command: 'svn update', description: 'Update working copy' },
          { command: 'svn add <file>', description: 'Schedule file for addition' },
          { command: 'svn commit -m "message"', description: 'Commit changes' },
          { command: 'svn status', description: 'Show working copy status' },
          { command: 'svn diff', description: 'Show local modifications' },
          { command: 'svn log', description: 'Show commit history' },
          { command: 'svn revert <file>', description: 'Revert local changes' },
        ],
      },
      {
        title: 'Branching & Tagging',
        commands: [
          { command: 'svn copy <src> <dest> -m "msg"', description: 'Create branch or tag' },
          { command: 'svn merge <url>', description: 'Merge changes from branch' },
          { command: 'svn switch <url>', description: 'Switch working copy to branch' },
          { command: 'svn info', description: 'Show working copy info' },
        ],
      },
    ],
  },

  // ── CONTAINERS & DEVOPS ──────────────────
  {
    id: 'docker',
    name: 'Docker',
    category: 'containers-devops',
    emoji: '🐳',
    description: 'Docker container commands for building, running, and managing containers',
    tags: ['docker', 'containers', 'images', 'compose', 'devops'],
    isPopular: true,
    sections: [
      {
        title: 'Images',
        commands: [
          { command: 'docker build -t <name> .', description: 'Build image from Dockerfile' },
          { command: 'docker images', description: 'List local images' },
          { command: 'docker pull <image>', description: 'Pull image from registry' },
          { command: 'docker push <image>', description: 'Push image to registry' },
          { command: 'docker rmi <image>', description: 'Remove an image' },
          { command: 'docker tag <src> <dest>', description: 'Tag an image' },
        ],
      },
      {
        title: 'Containers',
        commands: [
          { command: 'docker run -it <image> bash', description: 'Run interactively' },
          { command: 'docker run -d -p 8080:80 <image>', description: 'Run detached with port mapping' },
          { command: 'docker ps', description: 'List running containers' },
          { command: 'docker ps -a', description: 'List all containers' },
          { command: 'docker stop <id>', description: 'Stop a container' },
          { command: 'docker rm <id>', description: 'Remove a container' },
          { command: 'docker logs <id>', description: 'View container logs' },
          { command: 'docker exec -it <id> bash', description: 'Execute command in running container' },
        ],
      },
      {
        title: 'Docker Compose',
        commands: [
          { command: 'docker compose up', description: 'Start services' },
          { command: 'docker compose up -d', description: 'Start services in background' },
          { command: 'docker compose down', description: 'Stop and remove containers' },
          { command: 'docker compose build', description: 'Build or rebuild services' },
          { command: 'docker compose logs -f', description: 'Follow service logs' },
          { command: 'docker compose ps', description: 'List service containers' },
        ],
      },
      {
        title: 'Cleanup',
        commands: [
          { command: 'docker system prune', description: 'Remove unused data' },
          { command: 'docker volume prune', description: 'Remove unused volumes' },
          { command: 'docker image prune -a', description: 'Remove all unused images' },
          { command: 'docker container prune', description: 'Remove stopped containers' },
        ],
      },
    ],
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes (kubectl)',
    category: 'containers-devops',
    emoji: '☸️',
    description: 'Kubernetes kubectl commands for cluster management',
    tags: ['kubernetes', 'k8s', 'kubectl', 'pods', 'deployments', 'services'],
    isPopular: true,
    sections: [
      {
        title: 'Cluster Info',
        commands: [
          { command: 'kubectl cluster-info', description: 'Display cluster info' },
          { command: 'kubectl get nodes', description: 'List cluster nodes' },
          { command: 'kubectl get namespaces', description: 'List namespaces' },
          { command: 'kubectl config get-contexts', description: 'List available contexts' },
          { command: 'kubectl config use-context <name>', description: 'Switch context' },
        ],
      },
      {
        title: 'Pods & Deployments',
        commands: [
          { command: 'kubectl get pods', description: 'List pods in current namespace' },
          { command: 'kubectl get pods -A', description: 'List pods in all namespaces' },
          { command: 'kubectl get deployments', description: 'List deployments' },
          { command: 'kubectl describe pod <name>', description: 'Show pod details' },
          { command: 'kubectl logs <pod>', description: 'View pod logs' },
          { command: 'kubectl logs -f <pod>', description: 'Stream pod logs' },
          { command: 'kubectl exec -it <pod> -- bash', description: 'Shell into pod' },
          { command: 'kubectl delete pod <name>', description: 'Delete a pod' },
        ],
      },
      {
        title: 'Apply & Manage',
        commands: [
          { command: 'kubectl apply -f <file.yaml>', description: 'Apply a manifest' },
          { command: 'kubectl delete -f <file.yaml>', description: 'Delete resources from manifest' },
          { command: 'kubectl scale deployment <name> --replicas=3', description: 'Scale a deployment' },
          { command: 'kubectl rollout status deployment/<name>', description: 'Check rollout status' },
          { command: 'kubectl rollout undo deployment/<name>', description: 'Rollback deployment' },
          { command: 'kubectl port-forward <pod> 8080:80', description: 'Forward port to pod' },
        ],
      },
      {
        title: 'Services & Networking',
        commands: [
          { command: 'kubectl get services', description: 'List services' },
          { command: 'kubectl get ingress', description: 'List ingress resources' },
          { command: 'kubectl expose deployment <name> --port=80', description: 'Expose deployment as service' },
          { command: 'kubectl get endpoints', description: 'List service endpoints' },
        ],
      },
    ],
  },
  {
    id: 'helm',
    name: 'Helm',
    category: 'containers-devops',
    emoji: '⎈',
    description: 'Helm package manager for Kubernetes',
    tags: ['helm', 'kubernetes', 'charts', 'packages', 'k8s'],
    isPopular: false,
    sections: [
      {
        title: 'Repo & Search',
        commands: [
          { command: 'helm repo add <name> <url>', description: 'Add a chart repository' },
          { command: 'helm repo update', description: 'Update chart repositories' },
          { command: 'helm search repo <keyword>', description: 'Search charts in repos' },
          { command: 'helm search hub <keyword>', description: 'Search Artifact Hub' },
        ],
      },
      {
        title: 'Install & Manage',
        commands: [
          { command: 'helm install <release> <chart>', description: 'Install a chart' },
          { command: 'helm install <release> <chart> -f values.yaml', description: 'Install with custom values' },
          { command: 'helm upgrade <release> <chart>', description: 'Upgrade a release' },
          { command: 'helm uninstall <release>', description: 'Uninstall a release' },
          { command: 'helm list', description: 'List installed releases' },
          { command: 'helm status <release>', description: 'Show release status' },
          { command: 'helm rollback <release> <revision>', description: 'Rollback to a revision' },
        ],
      },
      {
        title: 'Create & Template',
        commands: [
          { command: 'helm create <name>', description: 'Create a new chart' },
          { command: 'helm template <release> <chart>', description: 'Render chart templates locally' },
          { command: 'helm lint <chart>', description: 'Lint a chart for issues' },
          { command: 'helm package <chart>', description: 'Package a chart' },
        ],
      },
    ],
  },
  {
    id: 'terraform',
    name: 'Terraform',
    category: 'containers-devops',
    emoji: '🏗️',
    description: 'HashiCorp Terraform infrastructure as code commands',
    tags: ['terraform', 'iac', 'infrastructure', 'hashicorp', 'hcl'],
    isPopular: true,
    sections: [
      {
        title: 'Init & Plan',
        commands: [
          { command: 'terraform init', description: 'Initialize working directory' },
          { command: 'terraform plan', description: 'Preview changes' },
          { command: 'terraform plan -out=plan.tfplan', description: 'Save plan to file' },
          { command: 'terraform validate', description: 'Validate configuration' },
          { command: 'terraform fmt', description: 'Format configuration files' },
        ],
      },
      {
        title: 'Apply & Destroy',
        commands: [
          { command: 'terraform apply', description: 'Apply changes' },
          { command: 'terraform apply -auto-approve', description: 'Apply without confirmation' },
          { command: 'terraform destroy', description: 'Destroy all resources' },
          { command: 'terraform apply -target=<resource>', description: 'Apply specific resource' },
        ],
      },
      {
        title: 'State Management',
        commands: [
          { command: 'terraform state list', description: 'List resources in state' },
          { command: 'terraform state show <resource>', description: 'Show resource details' },
          { command: 'terraform state mv <src> <dest>', description: 'Move resource in state' },
          { command: 'terraform state rm <resource>', description: 'Remove resource from state' },
          { command: 'terraform import <resource> <id>', description: 'Import existing resource' },
          { command: 'terraform output', description: 'Show output values' },
        ],
      },
      {
        title: 'Workspace',
        commands: [
          { command: 'terraform workspace list', description: 'List workspaces' },
          { command: 'terraform workspace new <name>', description: 'Create workspace' },
          { command: 'terraform workspace select <name>', description: 'Switch workspace' },
        ],
      },
    ],
  },
  {
    id: 'ansible',
    name: 'Ansible',
    category: 'containers-devops',
    emoji: '🅰️',
    description: 'Ansible automation and configuration management',
    tags: ['ansible', 'automation', 'configuration', 'playbook', 'devops'],
    isPopular: false,
    sections: [
      {
        title: 'Ad-hoc Commands',
        commands: [
          { command: 'ansible all -m ping', description: 'Ping all hosts' },
          { command: 'ansible all -m shell -a "uptime"', description: 'Run shell command on all hosts' },
          { command: 'ansible all -m copy -a "src=f dest=f"', description: 'Copy file to all hosts' },
          { command: 'ansible-inventory --list', description: 'List inventory' },
        ],
      },
      {
        title: 'Playbooks',
        commands: [
          { command: 'ansible-playbook playbook.yml', description: 'Run a playbook' },
          { command: 'ansible-playbook playbook.yml -i inventory', description: 'Run with custom inventory' },
          { command: 'ansible-playbook playbook.yml --check', description: 'Dry run (check mode)' },
          { command: 'ansible-playbook playbook.yml --tags "tag"', description: 'Run specific tags only' },
          { command: 'ansible-playbook playbook.yml --limit host', description: 'Limit to specific hosts' },
          { command: 'ansible-playbook playbook.yml -e "var=val"', description: 'Pass extra variables' },
        ],
      },
      {
        title: 'Vault',
        commands: [
          { command: 'ansible-vault create secrets.yml', description: 'Create encrypted file' },
          { command: 'ansible-vault edit secrets.yml', description: 'Edit encrypted file' },
          { command: 'ansible-vault encrypt secrets.yml', description: 'Encrypt existing file' },
          { command: 'ansible-vault decrypt secrets.yml', description: 'Decrypt file' },
        ],
      },
    ],
  },
  {
    id: 'jenkins',
    name: 'Jenkins',
    category: 'containers-devops',
    emoji: '🔧',
    description: 'Jenkins CI/CD pipeline syntax and commands',
    tags: ['jenkins', 'ci', 'cd', 'pipeline', 'groovy'],
    isPopular: false,
    sections: [
      {
        title: 'Declarative Pipeline',
        commands: [
          { command: "pipeline { agent any; stages { stage('Build') { steps { sh 'make' } } } }", description: 'Basic pipeline structure' },
          { command: "agent { docker { image 'node:18' } }", description: 'Run in Docker container' },
          { command: "when { branch 'main' }", description: 'Conditional stage execution' },
          { command: "environment { MY_VAR = 'value' }", description: 'Set environment variables' },
          { command: "post { always { junit 'reports/*.xml' } }", description: 'Post-build actions' },
        ],
      },
      {
        title: 'Jenkins CLI',
        commands: [
          { command: 'jenkins-cli build <job>', description: 'Trigger a build' },
          { command: 'jenkins-cli list-jobs', description: 'List all jobs' },
          { command: 'jenkins-cli console <job> <build>', description: 'View build console output' },
          { command: 'jenkins-cli who-am-i', description: 'Show current user' },
        ],
      },
    ],
  },
  {
    id: 'github-actions',
    name: 'GitHub Actions',
    category: 'containers-devops',
    emoji: '⚡',
    description: 'GitHub Actions workflow syntax and patterns',
    tags: ['github actions', 'ci', 'cd', 'workflows', 'yaml'],
    isPopular: true,
    sections: [
      {
        title: 'Workflow Basics',
        commands: [
          { command: "on: push: branches: ['main']", description: 'Trigger on push to main' },
          { command: 'on: pull_request:', description: 'Trigger on pull request' },
          { command: "on: schedule: - cron: '0 0 * * *'", description: 'Scheduled workflow (daily)' },
          { command: 'on: workflow_dispatch:', description: 'Manual trigger' },
          { command: 'runs-on: ubuntu-latest', description: 'Specify runner OS' },
        ],
      },
      {
        title: 'Steps & Actions',
        commands: [
          { command: 'uses: actions/checkout@v4', description: 'Check out repository' },
          { command: 'uses: actions/setup-node@v4', description: 'Set up Node.js' },
          { command: "run: npm ci && npm test", description: 'Run shell commands' },
          { command: 'env: MY_TOKEN: ${{ secrets.TOKEN }}', description: 'Use secret as env var' },
          { command: "if: github.ref == 'refs/heads/main'", description: 'Conditional step' },
          { command: 'with: node-version: 20', description: 'Pass inputs to action' },
        ],
      },
      {
        title: 'Expressions & Contexts',
        commands: [
          { command: '${{ github.sha }}', description: 'Current commit SHA' },
          { command: '${{ github.ref_name }}', description: 'Branch or tag name' },
          { command: '${{ secrets.MY_SECRET }}', description: 'Access a secret' },
          { command: '${{ env.MY_VAR }}', description: 'Access environment variable' },
          { command: '${{ needs.build.outputs.version }}', description: 'Output from another job' },
        ],
      },
      {
        title: 'Caching & Artifacts',
        commands: [
          { command: 'uses: actions/cache@v4', description: 'Cache dependencies' },
          { command: 'uses: actions/upload-artifact@v4', description: 'Upload build artifact' },
          { command: 'uses: actions/download-artifact@v4', description: 'Download artifact' },
        ],
      },
    ],
  },
  {
    id: 'packer',
    name: 'Packer',
    category: 'containers-devops',
    emoji: '📦',
    description: 'HashiCorp Packer machine image builder',
    tags: ['packer', 'images', 'ami', 'hashicorp', 'automation'],
    isPopular: false,
    sections: [
      {
        title: 'Build & Validate',
        commands: [
          { command: 'packer init .', description: 'Initialize Packer plugins' },
          { command: 'packer validate template.pkr.hcl', description: 'Validate template' },
          { command: 'packer build template.pkr.hcl', description: 'Build machine image' },
          { command: 'packer build -var "region=us-east-1" .', description: 'Build with variables' },
          { command: 'packer fmt .', description: 'Format HCL templates' },
          { command: 'packer inspect template.pkr.hcl', description: 'Inspect template' },
        ],
      },
    ],
  },
  {
    id: 'kustomize',
    name: 'Kustomize',
    category: 'containers-devops',
    emoji: '🎨',
    description: 'Kubernetes native configuration management',
    tags: ['kustomize', 'kubernetes', 'k8s', 'yaml', 'overlays'],
    isPopular: false,
    sections: [
      {
        title: 'Build & Apply',
        commands: [
          { command: 'kustomize build <dir>', description: 'Build kustomization output' },
          { command: 'kubectl apply -k <dir>', description: 'Apply kustomization directly' },
          { command: 'kustomize build overlays/prod', description: 'Build specific overlay' },
          { command: 'kustomize edit set image app=app:v2', description: 'Update image in kustomization' },
          { command: 'kustomize edit add resource deploy.yaml', description: 'Add resource to kustomization' },
          { command: 'kustomize edit set namespace prod', description: 'Set namespace' },
        ],
      },
    ],
  },

  // ── CLOUD CLIs ──────────────────────────
  {
    id: 'aws-cli',
    name: 'AWS CLI',
    category: 'cloud',
    emoji: '☁️',
    description: 'Amazon Web Services CLI essential commands',
    tags: ['aws', 'cloud', 's3', 'ec2', 'lambda', 'iam'],
    isPopular: true,
    sections: [
      {
        title: 'Configuration',
        commands: [
          { command: 'aws configure', description: 'Set up credentials and region' },
          { command: 'aws sts get-caller-identity', description: 'Check current identity' },
          { command: 'aws configure list-profiles', description: 'List configured profiles' },
          { command: 'aws --profile <name> s3 ls', description: 'Use a named profile' },
        ],
      },
      {
        title: 'S3',
        commands: [
          { command: 'aws s3 ls', description: 'List all buckets' },
          { command: 'aws s3 ls s3://<bucket>', description: 'List bucket contents' },
          { command: 'aws s3 cp file.txt s3://<bucket>/', description: 'Upload file to S3' },
          { command: 'aws s3 sync . s3://<bucket>/', description: 'Sync directory to S3' },
          { command: 'aws s3 rm s3://<bucket>/file.txt', description: 'Delete object from S3' },
          { command: 'aws s3 mb s3://<bucket>', description: 'Create a new bucket' },
        ],
      },
      {
        title: 'EC2',
        commands: [
          { command: 'aws ec2 describe-instances', description: 'List EC2 instances' },
          { command: 'aws ec2 start-instances --instance-ids <id>', description: 'Start instance' },
          { command: 'aws ec2 stop-instances --instance-ids <id>', description: 'Stop instance' },
          { command: 'aws ec2 describe-security-groups', description: 'List security groups' },
        ],
      },
      {
        title: 'Lambda',
        commands: [
          { command: 'aws lambda list-functions', description: 'List Lambda functions' },
          { command: 'aws lambda invoke --function-name <fn> out.json', description: 'Invoke a function' },
          { command: 'aws lambda update-function-code --function-name <fn> --zip-file fileb://code.zip', description: 'Update function code' },
        ],
      },
      {
        title: 'IAM',
        commands: [
          { command: 'aws iam list-users', description: 'List IAM users' },
          { command: 'aws iam list-roles', description: 'List IAM roles' },
          { command: 'aws iam get-user', description: 'Get current user info' },
        ],
      },
    ],
  },
  {
    id: 'azure-cli',
    name: 'Azure CLI',
    category: 'cloud',
    emoji: '🔷',
    description: 'Microsoft Azure CLI essential commands',
    tags: ['azure', 'cloud', 'microsoft', 'az', 'resource group'],
    isPopular: true,
    sections: [
      {
        title: 'Auth & Account',
        commands: [
          { command: 'az login', description: 'Log in to Azure' },
          { command: 'az account show', description: 'Show current subscription' },
          { command: 'az account list', description: 'List subscriptions' },
          { command: 'az account set -s <id>', description: 'Set active subscription' },
        ],
      },
      {
        title: 'Resource Groups',
        commands: [
          { command: 'az group list -o table', description: 'List resource groups' },
          { command: 'az group create -n <name> -l <location>', description: 'Create resource group' },
          { command: 'az group delete -n <name>', description: 'Delete resource group' },
        ],
      },
      {
        title: 'VMs & App Service',
        commands: [
          { command: 'az vm list -o table', description: 'List virtual machines' },
          { command: 'az vm start -g <rg> -n <vm>', description: 'Start a VM' },
          { command: 'az vm stop -g <rg> -n <vm>', description: 'Stop a VM' },
          { command: 'az webapp list -o table', description: 'List web apps' },
          { command: 'az webapp deploy -g <rg> -n <app> --src-path app.zip', description: 'Deploy to web app' },
        ],
      },
      {
        title: 'Storage',
        commands: [
          { command: 'az storage account list -o table', description: 'List storage accounts' },
          { command: 'az storage blob upload -f <file> -c <container> -n <blob>', description: 'Upload blob' },
          { command: 'az storage blob list -c <container>', description: 'List blobs in container' },
        ],
      },
    ],
  },
  {
    id: 'gcp-cli',
    name: 'GCP CLI (gcloud)',
    category: 'cloud',
    emoji: '🌐',
    description: 'Google Cloud Platform CLI essential commands',
    tags: ['gcp', 'google cloud', 'gcloud', 'compute', 'cloud run'],
    isPopular: true,
    sections: [
      {
        title: 'Auth & Config',
        commands: [
          { command: 'gcloud auth login', description: 'Authenticate with Google Cloud' },
          { command: 'gcloud config set project <id>', description: 'Set active project' },
          { command: 'gcloud config list', description: 'List current configuration' },
          { command: 'gcloud projects list', description: 'List all projects' },
        ],
      },
      {
        title: 'Compute Engine',
        commands: [
          { command: 'gcloud compute instances list', description: 'List VM instances' },
          { command: 'gcloud compute instances start <name>', description: 'Start instance' },
          { command: 'gcloud compute instances stop <name>', description: 'Stop instance' },
          { command: 'gcloud compute ssh <instance>', description: 'SSH into instance' },
        ],
      },
      {
        title: 'Cloud Run & Functions',
        commands: [
          { command: 'gcloud run deploy <svc> --image <img>', description: 'Deploy to Cloud Run' },
          { command: 'gcloud run services list', description: 'List Cloud Run services' },
          { command: 'gcloud functions deploy <fn> --runtime nodejs20', description: 'Deploy Cloud Function' },
          { command: 'gcloud functions list', description: 'List Cloud Functions' },
        ],
      },
      {
        title: 'Storage',
        commands: [
          { command: 'gsutil ls', description: 'List GCS buckets' },
          { command: 'gsutil cp file.txt gs://<bucket>/', description: 'Upload to GCS' },
          { command: 'gsutil rsync -r . gs://<bucket>/', description: 'Sync directory to GCS' },
          { command: 'gsutil rm gs://<bucket>/file.txt', description: 'Delete GCS object' },
        ],
      },
    ],
  },
  {
    id: 'cloudflare-workers',
    name: 'Cloudflare Workers (Wrangler)',
    category: 'cloud',
    emoji: '🟠',
    description: 'Cloudflare Workers CLI (wrangler) commands',
    tags: ['cloudflare', 'workers', 'wrangler', 'edge', 'serverless'],
    isPopular: false,
    sections: [
      {
        title: 'Project Setup',
        commands: [
          { command: 'npm create cloudflare@latest', description: 'Create new Workers project' },
          { command: 'wrangler login', description: 'Authenticate with Cloudflare' },
          { command: 'wrangler whoami', description: 'Check logged-in identity' },
        ],
      },
      {
        title: 'Development & Deploy',
        commands: [
          { command: 'wrangler dev', description: 'Start local dev server' },
          { command: 'wrangler deploy', description: 'Deploy worker to production' },
          { command: 'wrangler tail', description: 'Stream live logs' },
          { command: 'wrangler delete', description: 'Delete deployed worker' },
        ],
      },
      {
        title: 'KV & D1',
        commands: [
          { command: 'wrangler kv namespace create <name>', description: 'Create KV namespace' },
          { command: 'wrangler kv key put --namespace-id <id> "key" "val"', description: 'Write KV key' },
          { command: 'wrangler d1 create <name>', description: 'Create D1 database' },
          { command: 'wrangler d1 execute <db> --command "SELECT * FROM t"', description: 'Execute D1 SQL' },
        ],
      },
    ],
  },
  {
    id: 'oracle-cloud-cli',
    name: 'Oracle Cloud CLI (OCI)',
    category: 'cloud',
    emoji: '🔴',
    description: 'Oracle Cloud Infrastructure CLI commands',
    tags: ['oracle', 'oci', 'cloud', 'compute', 'storage'],
    isPopular: false,
    sections: [
      {
        title: 'Setup & Auth',
        commands: [
          { command: 'oci setup config', description: 'Configure OCI CLI' },
          { command: 'oci iam region list', description: 'List available regions' },
          { command: 'oci iam compartment list', description: 'List compartments' },
        ],
      },
      {
        title: 'Compute & Storage',
        commands: [
          { command: 'oci compute instance list --compartment-id <id>', description: 'List instances' },
          { command: 'oci compute instance action --action START --instance-id <id>', description: 'Start instance' },
          { command: 'oci os bucket list --compartment-id <id>', description: 'List storage buckets' },
          { command: 'oci os object put -bn <bucket> --file <file>', description: 'Upload object' },
        ],
      },
    ],
  },

  // ── LINUX & SHELL ──────────────────────
  {
    id: 'bash',
    name: 'Bash Scripting',
    category: 'linux-shell',
    emoji: '🐚',
    description: 'Bash scripting syntax and common patterns',
    tags: ['bash', 'shell', 'scripting', 'linux', 'unix'],
    isPopular: true,
    sections: [
      {
        title: 'Variables & Strings',
        commands: [
          { command: 'NAME="value"', description: 'Assign variable (no spaces around =)' },
          { command: 'echo "$NAME"', description: 'Print variable (double quotes expand)' },
          { command: "echo '$NAME'", description: 'Print literal (single quotes = no expansion)' },
          { command: '${#STRING}', description: 'String length' },
          { command: '${STRING:0:5}', description: 'Substring (offset:length)' },
          { command: '${STRING/old/new}', description: 'String substitution' },
          { command: 'readonly VAR="immutable"', description: 'Read-only variable' },
        ],
      },
      {
        title: 'Conditionals',
        commands: [
          { command: 'if [ "$a" = "$b" ]; then ... fi', description: 'String comparison' },
          { command: 'if [ "$a" -eq "$b" ]; then ... fi', description: 'Numeric comparison' },
          { command: 'if [ -f "$file" ]; then ... fi', description: 'Check if file exists' },
          { command: 'if [ -d "$dir" ]; then ... fi', description: 'Check if directory exists' },
          { command: 'if [ -z "$var" ]; then ... fi', description: 'Check if string is empty' },
          { command: '[[ "$str" =~ ^[0-9]+$ ]]', description: 'Regex match' },
        ],
      },
      {
        title: 'Loops',
        commands: [
          { command: 'for i in 1 2 3; do echo $i; done', description: 'For loop (list)' },
          { command: 'for f in *.txt; do echo "$f"; done', description: 'For loop (glob)' },
          { command: 'for ((i=0; i<10; i++)); do ...; done', description: 'C-style for loop' },
          { command: 'while read -r line; do echo "$line"; done < file', description: 'Read file line by line' },
        ],
      },
      {
        title: 'Functions & Arguments',
        commands: [
          { command: 'function name() { echo "Hello $1"; }', description: 'Define a function' },
          { command: '$0, $1, $2 ...', description: 'Script name and positional args' },
          { command: '$#', description: 'Number of arguments' },
          { command: '$@', description: 'All arguments as separate words' },
          { command: '$?', description: 'Exit status of last command' },
          { command: 'set -euo pipefail', description: 'Strict mode (recommended)' },
        ],
      },
    ],
  },
  {
    id: 'linux-commands',
    name: 'Linux Commands',
    category: 'linux-shell',
    emoji: '🐧',
    description: 'Essential Linux command-line commands',
    tags: ['linux', 'commands', 'files', 'processes', 'system'],
    isPopular: true,
    sections: [
      {
        title: 'Files & Directories',
        commands: [
          { command: 'ls -la', description: 'List all files with details' },
          { command: 'cd <dir>', description: 'Change directory' },
          { command: 'pwd', description: 'Print working directory' },
          { command: 'mkdir -p path/to/dir', description: 'Create nested directories' },
          { command: 'cp -r src/ dest/', description: 'Copy directory recursively' },
          { command: 'mv old new', description: 'Move or rename file' },
          { command: 'rm -rf <dir>', description: 'Remove directory recursively' },
          { command: 'find . -name "*.log" -type f', description: 'Find files by name' },
          { command: 'du -sh *', description: 'Directory sizes (human-readable)' },
          { command: 'df -h', description: 'Disk space usage' },
        ],
      },
      {
        title: 'Text Processing',
        commands: [
          { command: 'cat file.txt', description: 'Print file contents' },
          { command: 'head -n 20 file.txt', description: 'First 20 lines' },
          { command: 'tail -f logfile', description: 'Follow log file' },
          { command: 'wc -l file.txt', description: 'Count lines' },
          { command: 'sort file.txt | uniq', description: 'Sort and deduplicate' },
          { command: 'cut -d"," -f1,3 file.csv', description: 'Extract CSV columns' },
        ],
      },
      {
        title: 'Processes',
        commands: [
          { command: 'ps aux', description: 'List all running processes' },
          { command: 'top', description: 'Real-time process monitor' },
          { command: 'htop', description: 'Interactive process viewer' },
          { command: 'kill <pid>', description: 'Terminate process' },
          { command: 'kill -9 <pid>', description: 'Force kill process' },
          { command: 'nohup command &', description: 'Run process in background' },
          { command: 'jobs', description: 'List background jobs' },
        ],
      },
      {
        title: 'Permissions',
        commands: [
          { command: 'chmod 755 file', description: 'Set file permissions (rwxr-xr-x)' },
          { command: 'chmod +x script.sh', description: 'Make file executable' },
          { command: 'chown user:group file', description: 'Change file ownership' },
          { command: 'sudo <command>', description: 'Run as superuser' },
        ],
      },
      {
        title: 'Compression',
        commands: [
          { command: 'tar -czf archive.tar.gz dir/', description: 'Create gzipped tar' },
          { command: 'tar -xzf archive.tar.gz', description: 'Extract gzipped tar' },
          { command: 'zip -r archive.zip dir/', description: 'Create zip archive' },
          { command: 'unzip archive.zip', description: 'Extract zip archive' },
        ],
      },
    ],
  },
  {
    id: 'vim',
    name: 'Vim',
    category: 'linux-shell',
    emoji: '📟',
    description: 'Vim text editor commands and shortcuts',
    tags: ['vim', 'editor', 'terminal', 'neovim', 'modal'],
    isPopular: true,
    sections: [
      {
        title: 'Modes',
        commands: [
          { command: 'i', description: 'Enter Insert mode (before cursor)' },
          { command: 'a', description: 'Enter Insert mode (after cursor)' },
          { command: 'o', description: 'Insert new line below and enter Insert mode' },
          { command: 'Esc', description: 'Return to Normal mode' },
          { command: 'v', description: 'Enter Visual mode (character)' },
          { command: 'V', description: 'Enter Visual mode (line)' },
          { command: ':', description: 'Enter Command-line mode' },
        ],
      },
      {
        title: 'Navigation',
        commands: [
          { command: 'h, j, k, l', description: 'Left, down, up, right' },
          { command: 'w / b', description: 'Next / previous word' },
          { command: '0 / $', description: 'Start / end of line' },
          { command: 'gg / G', description: 'Start / end of file' },
          { command: '<n>G', description: 'Go to line n' },
          { command: 'Ctrl+d / Ctrl+u', description: 'Half-page down / up' },
          { command: '% ', description: 'Jump to matching bracket' },
        ],
      },
      {
        title: 'Editing',
        commands: [
          { command: 'dd', description: 'Delete (cut) line' },
          { command: 'yy', description: 'Yank (copy) line' },
          { command: 'p', description: 'Paste after cursor' },
          { command: 'u', description: 'Undo' },
          { command: 'Ctrl+r', description: 'Redo' },
          { command: 'ciw', description: 'Change inner word' },
          { command: 'di"', description: 'Delete inside quotes' },
          { command: '.', description: 'Repeat last change' },
        ],
      },
      {
        title: 'Search & Replace',
        commands: [
          { command: '/<pattern>', description: 'Search forward' },
          { command: '?<pattern>', description: 'Search backward' },
          { command: 'n / N', description: 'Next / previous match' },
          { command: ':%s/old/new/g', description: 'Replace all in file' },
          { command: ':s/old/new/g', description: 'Replace all in current line' },
        ],
      },
      {
        title: 'Save & Quit',
        commands: [
          { command: ':w', description: 'Save file' },
          { command: ':q', description: 'Quit' },
          { command: ':wq', description: 'Save and quit' },
          { command: ':q!', description: 'Quit without saving' },
          { command: ':x', description: 'Save and quit (only writes if changed)' },
        ],
      },
    ],
  },
  {
    id: 'tmux',
    name: 'Tmux',
    category: 'linux-shell',
    emoji: '🖥️',
    description: 'Tmux terminal multiplexer commands',
    tags: ['tmux', 'terminal', 'multiplexer', 'sessions', 'linux'],
    isPopular: false,
    sections: [
      {
        title: 'Sessions',
        commands: [
          { command: 'tmux new -s <name>', description: 'Create named session' },
          { command: 'tmux ls', description: 'List sessions' },
          { command: 'tmux attach -t <name>', description: 'Attach to session' },
          { command: 'tmux kill-session -t <name>', description: 'Kill session' },
          { command: 'Ctrl+b d', description: 'Detach from session' },
        ],
      },
      {
        title: 'Windows (Ctrl+b prefix)',
        commands: [
          { command: 'Ctrl+b c', description: 'Create new window' },
          { command: 'Ctrl+b n / p', description: 'Next / previous window' },
          { command: 'Ctrl+b <number>', description: 'Switch to window N' },
          { command: 'Ctrl+b ,', description: 'Rename current window' },
          { command: 'Ctrl+b &', description: 'Close current window' },
        ],
      },
      {
        title: 'Panes (Ctrl+b prefix)',
        commands: [
          { command: 'Ctrl+b %', description: 'Split pane vertically' },
          { command: 'Ctrl+b "', description: 'Split pane horizontally' },
          { command: 'Ctrl+b arrow', description: 'Switch between panes' },
          { command: 'Ctrl+b z', description: 'Toggle pane zoom' },
          { command: 'Ctrl+b x', description: 'Close current pane' },
          { command: 'Ctrl+b {/}', description: 'Swap pane left/right' },
        ],
      },
    ],
  },
  {
    id: 'ssh',
    name: 'SSH',
    category: 'linux-shell',
    emoji: '🔑',
    description: 'SSH commands for secure remote access',
    tags: ['ssh', 'remote', 'keys', 'tunnel', 'scp'],
    isPopular: false,
    sections: [
      {
        title: 'Connect & Keys',
        commands: [
          { command: 'ssh user@host', description: 'Connect to remote host' },
          { command: 'ssh -p 2222 user@host', description: 'Connect on custom port' },
          { command: 'ssh-keygen -t ed25519', description: 'Generate SSH key pair' },
          { command: 'ssh-copy-id user@host', description: 'Copy public key to server' },
          { command: 'ssh-add ~/.ssh/id_ed25519', description: 'Add key to SSH agent' },
        ],
      },
      {
        title: 'Tunneling & Transfer',
        commands: [
          { command: 'ssh -L 8080:localhost:80 user@host', description: 'Local port forwarding' },
          { command: 'ssh -R 8080:localhost:80 user@host', description: 'Remote port forwarding' },
          { command: 'ssh -D 1080 user@host', description: 'SOCKS proxy tunnel' },
          { command: 'scp file.txt user@host:/path/', description: 'Copy file to remote' },
          { command: 'scp user@host:/path/file.txt .', description: 'Copy file from remote' },
          { command: 'scp -r dir/ user@host:/path/', description: 'Copy directory recursively' },
        ],
      },
      {
        title: 'Config (~/.ssh/config)',
        commands: [
          { command: 'Host myserver\\n  HostName 1.2.3.4\\n  User admin\\n  Port 22', description: 'SSH config entry (then: ssh myserver)' },
          { command: 'Host *\\n  ServerAliveInterval 60', description: 'Keep connections alive' },
        ],
      },
    ],
  },
  {
    id: 'grep-awk-sed',
    name: 'Grep / Awk / Sed',
    category: 'linux-shell',
    emoji: '🔍',
    description: 'Text processing with grep, awk, and sed',
    tags: ['grep', 'awk', 'sed', 'regex', 'text processing', 'linux'],
    isPopular: false,
    sections: [
      {
        title: 'Grep',
        commands: [
          { command: 'grep "pattern" file', description: 'Search for pattern in file' },
          { command: 'grep -r "pattern" dir/', description: 'Recursive search' },
          { command: 'grep -i "pattern" file', description: 'Case-insensitive search' },
          { command: 'grep -n "pattern" file', description: 'Show line numbers' },
          { command: 'grep -c "pattern" file', description: 'Count matching lines' },
          { command: 'grep -v "pattern" file', description: 'Invert match (non-matching)' },
          { command: 'grep -E "pat1|pat2" file', description: 'Extended regex (OR)' },
          { command: 'grep -l "pattern" *.txt', description: 'Show only filenames' },
        ],
      },
      {
        title: 'Awk',
        commands: [
          { command: "awk '{print $1}' file", description: 'Print first column' },
          { command: "awk -F',' '{print $2}' file.csv", description: 'CSV second column' },
          { command: "awk '$3 > 100' file", description: 'Filter by condition' },
          { command: "awk '{sum+=$1} END {print sum}' file", description: 'Sum first column' },
          { command: "awk 'NR==5,NR==10' file", description: 'Print lines 5-10' },
          { command: "awk '{print NR, $0}' file", description: 'Add line numbers' },
        ],
      },
      {
        title: 'Sed',
        commands: [
          { command: "sed 's/old/new/' file", description: 'Replace first occurrence per line' },
          { command: "sed 's/old/new/g' file", description: 'Replace all occurrences' },
          { command: "sed -i 's/old/new/g' file", description: 'Edit file in-place' },
          { command: "sed '5d' file", description: 'Delete line 5' },
          { command: "sed '/pattern/d' file", description: 'Delete lines matching pattern' },
          { command: "sed -n '10,20p' file", description: 'Print lines 10-20' },
        ],
      },
    ],
  },

  // ── PROGRAMMING LANGUAGES ──────────────
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'languages',
    emoji: '🟨',
    description: 'Modern JavaScript (ES6+) syntax reference',
    tags: ['javascript', 'js', 'es6', 'modern', 'web'],
    isPopular: true,
    sections: [
      {
        title: 'Variables & Types',
        commands: [
          { command: 'const x = 10', description: 'Block-scoped constant' },
          { command: 'let y = "hello"', description: 'Block-scoped variable' },
          { command: 'typeof x', description: 'Check type of value' },
          { command: 'Array.isArray(arr)', description: 'Check if value is an array' },
        ],
      },
      {
        title: 'Destructuring & Spread',
        commands: [
          { command: 'const { a, b } = obj', description: 'Object destructuring' },
          { command: 'const [x, y] = arr', description: 'Array destructuring' },
          { command: 'const { a: renamed } = obj', description: 'Destructure with rename' },
          { command: 'const newObj = { ...obj, key: val }', description: 'Spread + override' },
          { command: 'const newArr = [...arr1, ...arr2]', description: 'Merge arrays' },
          { command: 'const { x, ...rest } = obj', description: 'Rest operator' },
        ],
      },
      {
        title: 'Array Methods',
        commands: [
          { command: 'arr.map(x => x * 2)', description: 'Transform each element' },
          { command: 'arr.filter(x => x > 5)', description: 'Filter elements' },
          { command: 'arr.reduce((acc, x) => acc + x, 0)', description: 'Reduce to single value' },
          { command: 'arr.find(x => x.id === 1)', description: 'Find first match' },
          { command: 'arr.some(x => x > 10)', description: 'Check if any element matches' },
          { command: 'arr.every(x => x > 0)', description: 'Check if all elements match' },
          { command: 'arr.flat(Infinity)', description: 'Flatten nested arrays' },
          { command: 'arr.sort((a, b) => a - b)', description: 'Sort numerically' },
          { command: '[...new Set(arr)]', description: 'Remove duplicates' },
        ],
      },
      {
        title: 'Async / Await',
        commands: [
          { command: 'async function fn() { ... }', description: 'Async function declaration' },
          { command: 'const result = await promise', description: 'Await a promise' },
          { command: 'try { await fn() } catch (e) { }', description: 'Error handling with async' },
          { command: 'await Promise.all([p1, p2])', description: 'Run promises in parallel' },
          { command: 'await Promise.allSettled([p1, p2])', description: 'Wait for all (including rejections)' },
        ],
      },
      {
        title: 'Optional Chaining & Nullish',
        commands: [
          { command: 'obj?.nested?.prop', description: 'Optional chaining' },
          { command: 'arr?.[0]', description: 'Optional array access' },
          { command: 'fn?.()', description: 'Optional function call' },
          { command: 'val ?? "default"', description: 'Nullish coalescing (null/undefined only)' },
          { command: 'val ??= "default"', description: 'Nullish assignment' },
        ],
      },
    ],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'languages',
    emoji: '🔷',
    description: 'TypeScript type syntax and patterns',
    tags: ['typescript', 'ts', 'types', 'generics', 'interfaces'],
    isPopular: true,
    sections: [
      {
        title: 'Basic Types',
        commands: [
          { command: 'let x: string = "hello"', description: 'String type' },
          { command: 'let n: number = 42', description: 'Number type' },
          { command: 'let b: boolean = true', description: 'Boolean type' },
          { command: 'let arr: string[] = ["a", "b"]', description: 'Array type' },
          { command: 'let tuple: [string, number] = ["a", 1]', description: 'Tuple type' },
          { command: 'let x: string | number', description: 'Union type' },
          { command: 'let x: "a" | "b" | "c"', description: 'Literal type' },
        ],
      },
      {
        title: 'Interfaces & Types',
        commands: [
          { command: 'interface User { name: string; age: number }', description: 'Interface declaration' },
          { command: 'interface User { email?: string }', description: 'Optional property' },
          { command: 'type Result = Success | Error', description: 'Type alias with union' },
          { command: 'type Props = { children: React.ReactNode }', description: 'Type alias for object' },
          { command: 'interface Repo extends Base { stars: number }', description: 'Interface extension' },
        ],
      },
      {
        title: 'Generics',
        commands: [
          { command: 'function identity<T>(arg: T): T', description: 'Generic function' },
          { command: 'Array<T>', description: 'Generic array type' },
          { command: 'Record<string, number>', description: 'Key-value record type' },
          { command: 'Partial<User>', description: 'All properties optional' },
          { command: 'Required<User>', description: 'All properties required' },
          { command: 'Pick<User, "name" | "email">', description: 'Select specific properties' },
          { command: 'Omit<User, "password">', description: 'Exclude specific properties' },
        ],
      },
      {
        title: 'Utility Types',
        commands: [
          { command: 'ReturnType<typeof fn>', description: 'Extract function return type' },
          { command: 'Parameters<typeof fn>', description: 'Extract function parameter types' },
          { command: 'Awaited<Promise<string>>', description: 'Unwrap promise type' },
          { command: 'keyof User', description: 'Union of property keys' },
          { command: 'typeof variable', description: 'Type from runtime value' },
          { command: 'as const', description: 'Const assertion (narrow to literal types)' },
        ],
      },
    ],
  },
  {
    id: 'python',
    name: 'Python',
    category: 'languages',
    emoji: '🐍',
    description: 'Python 3 syntax and common patterns',
    tags: ['python', 'py', 'scripting', 'data', 'web'],
    isPopular: true,
    sections: [
      {
        title: 'Data Structures',
        commands: [
          { command: 'my_list = [1, 2, 3]', description: 'List (mutable, ordered)' },
          { command: 'my_tuple = (1, 2, 3)', description: 'Tuple (immutable, ordered)' },
          { command: 'my_set = {1, 2, 3}', description: 'Set (unique values)' },
          { command: 'my_dict = {"key": "value"}', description: 'Dictionary (key-value pairs)' },
          { command: '[x**2 for x in range(10)]', description: 'List comprehension' },
          { command: '{k: v for k, v in items}', description: 'Dict comprehension' },
          { command: '{x for x in lst if x > 5}', description: 'Set comprehension' },
        ],
      },
      {
        title: 'Functions',
        commands: [
          { command: 'def fn(x, y=10):', description: 'Function with default arg' },
          { command: 'def fn(*args, **kwargs):', description: 'Variadic function' },
          { command: 'lambda x: x * 2', description: 'Lambda (anonymous function)' },
          { command: '@decorator', description: 'Function decorator' },
          { command: 'def fn() -> int:', description: 'Type hint on return' },
          { command: 'def fn(x: str, y: int = 0):', description: 'Type hints on parameters' },
        ],
      },
      {
        title: 'String Methods',
        commands: [
          { command: 'f"Hello {name}"', description: 'F-string formatting' },
          { command: '"hello".upper()', description: 'Uppercase string' },
          { command: '" hello ".strip()', description: 'Remove whitespace' },
          { command: '"a,b,c".split(",")', description: 'Split string' },
          { command: '",".join(["a", "b"])', description: 'Join list to string' },
          { command: '"hello".startswith("he")', description: 'Check prefix' },
          { command: '"hello".replace("l", "r")', description: 'Replace substring' },
        ],
      },
      {
        title: 'File I/O & Error Handling',
        commands: [
          { command: 'with open("file.txt") as f: data = f.read()', description: 'Read entire file' },
          { command: 'with open("file.txt", "w") as f: f.write(text)', description: 'Write to file' },
          { command: 'try: ...\nexcept ValueError as e: ...\nfinally: ...', description: 'Exception handling' },
          { command: 'raise ValueError("msg")', description: 'Raise an exception' },
        ],
      },
      {
        title: 'Useful Builtins',
        commands: [
          { command: 'enumerate(lst)', description: 'Iterate with index' },
          { command: 'zip(lst1, lst2)', description: 'Pair elements from two lists' },
          { command: 'map(fn, lst)', description: 'Apply function to all elements' },
          { command: 'filter(fn, lst)', description: 'Filter elements by function' },
          { command: 'sorted(lst, key=lambda x: x[1])', description: 'Sort with custom key' },
          { command: 'isinstance(obj, str)', description: 'Check type' },
        ],
      },
    ],
  },
  {
    id: 'go',
    name: 'Go',
    category: 'languages',
    emoji: '🐹',
    description: 'Go (Golang) syntax and common patterns',
    tags: ['go', 'golang', 'concurrency', 'goroutines', 'channels'],
    isPopular: false,
    sections: [
      {
        title: 'Basics',
        commands: [
          { command: 'var x int = 10', description: 'Variable with explicit type' },
          { command: 'x := 10', description: 'Short variable declaration' },
          { command: 'const Pi = 3.14', description: 'Constant' },
          { command: 'func add(a, b int) int { return a + b }', description: 'Function' },
          { command: 'func divide(a, b int) (int, error)', description: 'Multiple return values' },
        ],
      },
      {
        title: 'Collections',
        commands: [
          { command: 'arr := [3]int{1, 2, 3}', description: 'Array (fixed size)' },
          { command: 'slice := []int{1, 2, 3}', description: 'Slice (dynamic)' },
          { command: 'slice = append(slice, 4)', description: 'Append to slice' },
          { command: 'm := map[string]int{"a": 1}', description: 'Map (dictionary)' },
          { command: 'val, ok := m["key"]', description: 'Map lookup with existence check' },
          { command: 'for i, v := range slice { }', description: 'Range over slice' },
          { command: 'for k, v := range m { }', description: 'Range over map' },
        ],
      },
      {
        title: 'Structs & Interfaces',
        commands: [
          { command: 'type User struct { Name string; Age int }', description: 'Struct definition' },
          { command: 'u := User{Name: "Alice", Age: 30}', description: 'Create struct' },
          { command: 'func (u User) String() string { }', description: 'Method on struct' },
          { command: 'type Reader interface { Read(p []byte) (int, error) }', description: 'Interface' },
        ],
      },
      {
        title: 'Concurrency',
        commands: [
          { command: 'go func() { ... }()', description: 'Launch goroutine' },
          { command: 'ch := make(chan int)', description: 'Create channel' },
          { command: 'ch <- 42', description: 'Send to channel' },
          { command: 'val := <-ch', description: 'Receive from channel' },
          { command: 'select { case v := <-ch: ... }', description: 'Select on multiple channels' },
          { command: 'var mu sync.Mutex; mu.Lock(); mu.Unlock()', description: 'Mutex lock/unlock' },
        ],
      },
      {
        title: 'Error Handling',
        commands: [
          { command: 'if err != nil { return err }', description: 'Standard error check' },
          { command: 'fmt.Errorf("failed: %w", err)', description: 'Wrap error with context' },
          { command: 'errors.Is(err, target)', description: 'Check error type' },
          { command: 'errors.As(err, &target)', description: 'Extract error type' },
        ],
      },
    ],
  },
  {
    id: 'rust',
    name: 'Rust Basics',
    category: 'languages',
    emoji: '🦀',
    description: 'Rust programming language essentials',
    tags: ['rust', 'systems', 'ownership', 'cargo', 'memory safety'],
    isPopular: false,
    sections: [
      {
        title: 'Variables & Types',
        commands: [
          { command: 'let x = 5;', description: 'Immutable variable' },
          { command: 'let mut x = 5;', description: 'Mutable variable' },
          { command: 'let x: i32 = 5;', description: 'Explicit type annotation' },
          { command: 'const MAX: u32 = 100;', description: 'Constant' },
          { command: 'let (x, y) = (1, 2);', description: 'Tuple destructuring' },
        ],
      },
      {
        title: 'Ownership & Borrowing',
        commands: [
          { command: 'let s2 = s1.clone();', description: 'Deep copy (clone)' },
          { command: 'fn f(s: &String)', description: 'Immutable borrow (reference)' },
          { command: 'fn f(s: &mut String)', description: 'Mutable borrow' },
          { command: 'let s2 = s1;  // s1 is now moved', description: 'Move semantics' },
        ],
      },
      {
        title: 'Enums & Pattern Matching',
        commands: [
          { command: 'enum Color { Red, Green, Blue }', description: 'Simple enum' },
          { command: 'enum Option<T> { Some(T), None }', description: 'Option type' },
          { command: 'match value { 1 => "one", _ => "other" }', description: 'Match expression' },
          { command: 'if let Some(v) = opt { }', description: 'If-let pattern' },
        ],
      },
      {
        title: 'Cargo (Package Manager)',
        commands: [
          { command: 'cargo new <name>', description: 'Create new project' },
          { command: 'cargo build', description: 'Build project' },
          { command: 'cargo run', description: 'Build and run' },
          { command: 'cargo test', description: 'Run tests' },
          { command: 'cargo add <crate>', description: 'Add dependency' },
          { command: 'cargo fmt', description: 'Format code' },
          { command: 'cargo clippy', description: 'Run linter' },
        ],
      },
    ],
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'languages',
    emoji: '📊',
    description: 'Standard SQL query syntax reference',
    tags: ['sql', 'database', 'queries', 'joins', 'aggregate'],
    isPopular: true,
    sections: [
      {
        title: 'CRUD',
        commands: [
          { command: 'SELECT * FROM users WHERE age > 18;', description: 'Read rows' },
          { command: "INSERT INTO users (name, age) VALUES ('Alice', 30);", description: 'Insert row' },
          { command: "UPDATE users SET age = 31 WHERE name = 'Alice';", description: 'Update row' },
          { command: "DELETE FROM users WHERE name = 'Bob';", description: 'Delete row' },
        ],
      },
      {
        title: 'Filtering & Sorting',
        commands: [
          { command: 'SELECT * FROM t WHERE col IN (1, 2, 3);', description: 'IN clause' },
          { command: 'SELECT * FROM t WHERE col BETWEEN 1 AND 10;', description: 'Range filter' },
          { command: "SELECT * FROM t WHERE name LIKE '%john%';", description: 'Pattern matching' },
          { command: 'SELECT * FROM t WHERE col IS NULL;', description: 'Check for NULL' },
          { command: 'SELECT * FROM t ORDER BY col DESC LIMIT 10;', description: 'Sort and limit' },
          { command: 'SELECT DISTINCT col FROM t;', description: 'Unique values' },
        ],
      },
      {
        title: 'Joins',
        commands: [
          { command: 'SELECT * FROM a INNER JOIN b ON a.id = b.a_id;', description: 'Inner join' },
          { command: 'SELECT * FROM a LEFT JOIN b ON a.id = b.a_id;', description: 'Left join (all from a)' },
          { command: 'SELECT * FROM a RIGHT JOIN b ON a.id = b.a_id;', description: 'Right join (all from b)' },
          { command: 'SELECT * FROM a FULL OUTER JOIN b ON a.id = b.a_id;', description: 'Full outer join' },
          { command: 'SELECT * FROM a CROSS JOIN b;', description: 'Cartesian product' },
        ],
      },
      {
        title: 'Aggregation',
        commands: [
          { command: 'SELECT COUNT(*) FROM t;', description: 'Count rows' },
          { command: 'SELECT SUM(col) FROM t;', description: 'Sum values' },
          { command: 'SELECT AVG(col) FROM t;', description: 'Average value' },
          { command: 'SELECT col, COUNT(*) FROM t GROUP BY col;', description: 'Group and count' },
          { command: 'SELECT col, COUNT(*) FROM t GROUP BY col HAVING COUNT(*) > 5;', description: 'Filter groups' },
        ],
      },
      {
        title: 'Schema',
        commands: [
          { command: 'CREATE TABLE t (id SERIAL PRIMARY KEY, name TEXT);', description: 'Create table' },
          { command: 'ALTER TABLE t ADD COLUMN email TEXT;', description: 'Add column' },
          { command: 'DROP TABLE t;', description: 'Drop table' },
          { command: 'CREATE INDEX idx_name ON t (col);', description: 'Create index' },
        ],
      },
    ],
  },
  {
    id: 'regex',
    name: 'Regular Expressions',
    category: 'languages',
    emoji: '🔣',
    description: 'Regex syntax reference for pattern matching',
    tags: ['regex', 'regular expressions', 'patterns', 'matching'],
    isPopular: true,
    sections: [
      {
        title: 'Character Classes',
        commands: [
          { command: '.', description: 'Any character except newline' },
          { command: '\\d', description: 'Digit [0-9]' },
          { command: '\\w', description: 'Word character [a-zA-Z0-9_]' },
          { command: '\\s', description: 'Whitespace (space, tab, newline)' },
          { command: '\\D, \\W, \\S', description: 'Negated versions (non-digit, etc.)' },
          { command: '[abc]', description: 'Character set (a, b, or c)' },
          { command: '[^abc]', description: 'Negated set (not a, b, or c)' },
          { command: '[a-z]', description: 'Character range' },
        ],
      },
      {
        title: 'Quantifiers',
        commands: [
          { command: '*', description: '0 or more' },
          { command: '+', description: '1 or more' },
          { command: '?', description: '0 or 1 (optional)' },
          { command: '{3}', description: 'Exactly 3' },
          { command: '{2,5}', description: 'Between 2 and 5' },
          { command: '{3,}', description: '3 or more' },
          { command: '*? +? ??', description: 'Lazy (non-greedy) versions' },
        ],
      },
      {
        title: 'Anchors & Groups',
        commands: [
          { command: '^', description: 'Start of string/line' },
          { command: '$', description: 'End of string/line' },
          { command: '\\b', description: 'Word boundary' },
          { command: '(abc)', description: 'Capture group' },
          { command: '(?:abc)', description: 'Non-capturing group' },
          { command: '(?<name>abc)', description: 'Named capture group' },
          { command: 'a|b', description: 'Alternation (a or b)' },
        ],
      },
      {
        title: 'Lookaround',
        commands: [
          { command: '(?=abc)', description: 'Positive lookahead' },
          { command: '(?!abc)', description: 'Negative lookahead' },
          { command: '(?<=abc)', description: 'Positive lookbehind' },
          { command: '(?<!abc)', description: 'Negative lookbehind' },
        ],
      },
      {
        title: 'Common Patterns',
        commands: [
          { command: '^[\\w.-]+@[\\w.-]+\\.\\w{2,}$', description: 'Email (basic)' },
          { command: '^https?:\\/\\/.+', description: 'URL (basic)' },
          { command: '^\\d{1,3}(\\.\\d{1,3}){3}$', description: 'IPv4 address' },
          { command: '^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$', description: 'Hex color' },
          { command: '^\\d{4}-\\d{2}-\\d{2}$', description: 'Date (YYYY-MM-DD)' },
        ],
      },
    ],
  },
  {
    id: 'dotnet-cli',
    name: '.NET CLI',
    category: 'languages',
    emoji: '🟣',
    description: '.NET CLI commands for building C# and .NET apps',
    tags: ['.net', 'dotnet', 'csharp', 'cli', 'nuget'],
    isPopular: false,
    sections: [
      {
        title: 'Project Management',
        commands: [
          { command: 'dotnet new console -n MyApp', description: 'Create console app' },
          { command: 'dotnet new webapi -n MyApi', description: 'Create Web API project' },
          { command: 'dotnet build', description: 'Build project' },
          { command: 'dotnet run', description: 'Build and run' },
          { command: 'dotnet test', description: 'Run tests' },
          { command: 'dotnet publish -c Release', description: 'Publish for deployment' },
        ],
      },
      {
        title: 'Packages (NuGet)',
        commands: [
          { command: 'dotnet add package <name>', description: 'Add NuGet package' },
          { command: 'dotnet remove package <name>', description: 'Remove package' },
          { command: 'dotnet list package', description: 'List installed packages' },
          { command: 'dotnet restore', description: 'Restore dependencies' },
        ],
      },
      {
        title: 'Entity Framework',
        commands: [
          { command: 'dotnet ef migrations add <name>', description: 'Create migration' },
          { command: 'dotnet ef database update', description: 'Apply migrations' },
          { command: 'dotnet ef migrations list', description: 'List migrations' },
        ],
      },
    ],
  },
  {
    id: 'java',
    name: 'Java',
    category: 'languages',
    emoji: '☕',
    description: 'Java essentials and modern features',
    tags: ['java', 'jvm', 'spring', 'maven', 'gradle'],
    isPopular: false,
    sections: [
      {
        title: 'Modern Java Features',
        commands: [
          { command: 'var x = "hello";', description: 'Local variable type inference (Java 10+)' },
          { command: 'record Point(int x, int y) {}', description: 'Record class (Java 14+)' },
          { command: 'sealed interface Shape permits Circle, Rect {}', description: 'Sealed class (Java 17+)' },
          { command: 'switch (obj) { case String s -> ... }', description: 'Pattern matching switch (Java 21+)' },
          { command: '"""\n  multi-line\n  text\n  """', description: 'Text blocks (Java 15+)' },
        ],
      },
      {
        title: 'Streams & Collections',
        commands: [
          { command: 'list.stream().filter(x -> x > 5).toList()', description: 'Filter and collect' },
          { command: 'list.stream().map(String::toUpperCase).toList()', description: 'Transform elements' },
          { command: 'list.stream().reduce(0, Integer::sum)', description: 'Reduce to sum' },
          { command: 'Map.of("key", "value")', description: 'Immutable map' },
          { command: 'List.of(1, 2, 3)', description: 'Immutable list' },
          { command: 'Optional.ofNullable(val).orElse(default)', description: 'Optional with default' },
        ],
      },
      {
        title: 'Build Tools',
        commands: [
          { command: 'mvn clean install', description: 'Maven: clean and build' },
          { command: 'mvn test', description: 'Maven: run tests' },
          { command: 'mvn dependency:tree', description: 'Maven: show dependencies' },
          { command: 'gradle build', description: 'Gradle: build project' },
          { command: 'gradle test', description: 'Gradle: run tests' },
        ],
      },
    ],
  },

  // ── FRAMEWORKS ──────────────────────────
  {
    id: 'react-hooks',
    name: 'React Hooks',
    category: 'frameworks',
    emoji: '⚛️',
    description: 'React hooks API quick reference',
    tags: ['react', 'hooks', 'usestate', 'useeffect', 'useref'],
    isPopular: true,
    sections: [
      {
        title: 'State & Effects',
        commands: [
          { command: 'const [val, setVal] = useState(initial)', description: 'State variable' },
          { command: 'useEffect(() => { ... }, [deps])', description: 'Side effect with dependencies' },
          { command: 'useEffect(() => { return () => cleanup }, [])', description: 'Effect with cleanup' },
          { command: 'const ref = useRef(null)', description: 'Mutable ref (persists across renders)' },
          { command: 'useLayoutEffect(() => { ... }, [])', description: 'Synchronous effect after render' },
        ],
      },
      {
        title: 'Memoization',
        commands: [
          { command: 'const val = useMemo(() => expensive(), [deps])', description: 'Memoize computed value' },
          { command: 'const fn = useCallback(() => { ... }, [deps])', description: 'Memoize function reference' },
          { command: 'export default memo(Component)', description: 'Memoize component (skip re-render)' },
        ],
      },
      {
        title: 'Context',
        commands: [
          { command: 'const MyCtx = createContext(defaultValue)', description: 'Create context' },
          { command: '<MyCtx.Provider value={val}>', description: 'Provide value to tree' },
          { command: 'const val = useContext(MyCtx)', description: 'Consume context value' },
        ],
      },
      {
        title: 'Reducers & Custom Hooks',
        commands: [
          { command: 'const [state, dispatch] = useReducer(reducer, init)', description: 'Complex state logic' },
          { command: 'const id = useId()', description: 'Unique ID for accessibility' },
          { command: 'function useCustom() { ... return { val } }', description: 'Custom hook pattern' },
        ],
      },
    ],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frameworks',
    emoji: '▲',
    description: 'Next.js App Router patterns and conventions',
    tags: ['nextjs', 'react', 'ssr', 'app router', 'server components'],
    isPopular: true,
    sections: [
      {
        title: 'File Conventions',
        commands: [
          { command: 'app/page.tsx', description: 'Route page component' },
          { command: 'app/layout.tsx', description: 'Shared layout (wraps pages)' },
          { command: 'app/loading.tsx', description: 'Loading UI (Suspense boundary)' },
          { command: 'app/error.tsx', description: 'Error boundary' },
          { command: 'app/not-found.tsx', description: 'Custom 404 page' },
          { command: 'app/[slug]/page.tsx', description: 'Dynamic route segment' },
          { command: 'app/api/route.ts', description: 'API route handler' },
        ],
      },
      {
        title: 'Data Fetching',
        commands: [
          { command: 'async function Page() { const data = await fetch(url) }', description: 'Server component fetch' },
          { command: "fetch(url, { next: { revalidate: 60 } })", description: 'ISR: revalidate every 60s' },
          { command: "fetch(url, { cache: 'no-store' })", description: 'Dynamic (no caching)' },
          { command: 'export async function generateStaticParams()', description: 'Pre-render dynamic routes' },
          { command: 'export async function generateMetadata()', description: 'Dynamic page metadata' },
        ],
      },
      {
        title: 'Client & Server',
        commands: [
          { command: "'use client'  // top of file", description: 'Mark as client component' },
          { command: "'use server'  // in function/file", description: 'Server action' },
          { command: "import { useRouter } from 'next/navigation'", description: 'Client-side navigation' },
          { command: "import { redirect } from 'next/navigation'", description: 'Server-side redirect' },
          { command: "import { cookies } from 'next/headers'", description: 'Read cookies (server only)' },
        ],
      },
      {
        title: 'CLI Commands',
        commands: [
          { command: 'npx create-next-app@latest', description: 'Create new Next.js app' },
          { command: 'next dev', description: 'Start dev server' },
          { command: 'next build', description: 'Production build' },
          { command: 'next start', description: 'Start production server' },
        ],
      },
    ],
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    category: 'frameworks',
    emoji: '🎨',
    description: 'Tailwind CSS utility class reference',
    tags: ['tailwind', 'css', 'utility', 'responsive', 'dark mode'],
    isPopular: true,
    sections: [
      {
        title: 'Layout',
        commands: [
          { command: 'flex items-center justify-between', description: 'Flexbox row, centered, space between' },
          { command: 'grid grid-cols-3 gap-4', description: '3-column grid with gap' },
          { command: 'container mx-auto px-4', description: 'Centered container with padding' },
          { command: 'hidden md:block', description: 'Hidden on mobile, visible on md+' },
          { command: 'absolute top-0 right-0', description: 'Absolute position, top-right' },
          { command: 'sticky top-0 z-50', description: 'Sticky header pattern' },
        ],
      },
      {
        title: 'Spacing & Sizing',
        commands: [
          { command: 'p-4  m-4', description: 'Padding / Margin (1rem)' },
          { command: 'px-4 py-2', description: 'Horizontal / Vertical padding' },
          { command: 'w-full h-screen', description: 'Full width / Full viewport height' },
          { command: 'max-w-lg min-h-[200px]', description: 'Max width / min-height (arbitrary)' },
          { command: 'space-y-4', description: 'Vertical spacing between children' },
        ],
      },
      {
        title: 'Typography & Colors',
        commands: [
          { command: 'text-lg font-bold text-gray-900', description: 'Large bold dark text' },
          { command: 'text-sm text-gray-500', description: 'Small muted text' },
          { command: 'bg-indigo-600 text-white', description: 'Indigo background, white text' },
          { command: 'hover:text-indigo-600', description: 'Color on hover' },
          { command: 'truncate', description: 'Overflow ellipsis on single line' },
          { command: 'line-clamp-3', description: 'Limit text to 3 lines' },
        ],
      },
      {
        title: 'Responsive & Dark Mode',
        commands: [
          { command: 'sm: md: lg: xl: 2xl:', description: 'Breakpoint prefixes (640/768/1024/1280/1536px)' },
          { command: 'dark:bg-gray-900 dark:text-white', description: 'Dark mode variants' },
          { command: 'md:grid-cols-2 lg:grid-cols-3', description: 'Responsive columns' },
        ],
      },
      {
        title: 'Effects & Transitions',
        commands: [
          { command: 'rounded-xl shadow-lg', description: 'Rounded corners + shadow' },
          { command: 'border border-gray-200', description: 'Border with color' },
          { command: 'transition-all duration-200', description: 'Smooth transitions' },
          { command: 'hover:-translate-y-1 hover:shadow-md', description: 'Lift on hover' },
          { command: 'opacity-0 group-hover:opacity-100', description: 'Show on parent hover' },
          { command: 'ring-2 ring-indigo-500', description: 'Focus ring' },
        ],
      },
    ],
  },
  {
    id: 'expressjs',
    name: 'Express.js',
    category: 'frameworks',
    emoji: '🚂',
    description: 'Express.js web framework API reference',
    tags: ['express', 'nodejs', 'api', 'rest', 'middleware'],
    isPopular: false,
    sections: [
      {
        title: 'Setup & Routes',
        commands: [
          { command: "const app = express()", description: 'Create Express app' },
          { command: "app.get('/api/users', (req, res) => { })", description: 'GET route' },
          { command: "app.post('/api/users', (req, res) => { })", description: 'POST route' },
          { command: "app.put('/api/users/:id', (req, res) => { })", description: 'PUT route with param' },
          { command: "app.delete('/api/users/:id', (req, res) => { })", description: 'DELETE route' },
          { command: "app.listen(3000, () => console.log('Running'))", description: 'Start server' },
        ],
      },
      {
        title: 'Request & Response',
        commands: [
          { command: 'req.params.id', description: 'URL parameter (/users/:id)' },
          { command: 'req.query.page', description: 'Query string (?page=1)' },
          { command: 'req.body.name', description: 'Request body (needs body-parser)' },
          { command: 'req.headers.authorization', description: 'Request header' },
          { command: 'res.json({ data })', description: 'Send JSON response' },
          { command: 'res.status(404).json({ error: "Not found" })', description: 'Error response' },
          { command: 'res.redirect("/new-url")', description: 'Redirect' },
        ],
      },
      {
        title: 'Middleware',
        commands: [
          { command: 'app.use(express.json())', description: 'Parse JSON bodies' },
          { command: 'app.use(cors())', description: 'Enable CORS' },
          { command: 'app.use("/api", router)', description: 'Mount router at path' },
          { command: 'const router = express.Router()', description: 'Create modular router' },
          { command: 'app.use((err, req, res, next) => { })', description: 'Error handler' },
        ],
      },
    ],
  },
  {
    id: 'vuejs',
    name: 'Vue.js 3',
    category: 'frameworks',
    emoji: '💚',
    description: 'Vue 3 Composition API quick reference',
    tags: ['vue', 'vuejs', 'composition api', 'reactive', 'components'],
    isPopular: false,
    sections: [
      {
        title: 'Composition API',
        commands: [
          { command: 'const count = ref(0)', description: 'Reactive primitive value' },
          { command: 'const state = reactive({ count: 0 })', description: 'Reactive object' },
          { command: 'const doubled = computed(() => count.value * 2)', description: 'Computed property' },
          { command: 'watch(count, (newVal, oldVal) => { })', description: 'Watch reactive value' },
          { command: 'watchEffect(() => { console.log(count.value) })', description: 'Auto-tracking effect' },
        ],
      },
      {
        title: 'Lifecycle & Template',
        commands: [
          { command: 'onMounted(() => { })', description: 'After component mounts' },
          { command: 'onUnmounted(() => { })', description: 'Before component unmounts' },
          { command: 'v-if="condition"', description: 'Conditional rendering' },
          { command: 'v-for="item in items" :key="item.id"', description: 'List rendering' },
          { command: 'v-model="value"', description: 'Two-way binding' },
          { command: '@click="handleClick"', description: 'Event handler shorthand' },
          { command: ':class="{ active: isActive }"', description: 'Dynamic class binding' },
        ],
      },
      {
        title: 'Props & Emits',
        commands: [
          { command: "defineProps<{ title: string; count?: number }>()", description: 'Define typed props' },
          { command: "defineEmits<{ (e: 'update', val: number): void }>()", description: 'Define typed emits' },
          { command: '<slot />', description: 'Default slot' },
          { command: '<slot name="header" />', description: 'Named slot' },
        ],
      },
    ],
  },

  // ── DATABASES ──────────────────────────
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'databases',
    emoji: '🐘',
    description: 'PostgreSQL-specific commands and features',
    tags: ['postgresql', 'postgres', 'psql', 'database', 'sql'],
    isPopular: true,
    sections: [
      {
        title: 'psql Meta-Commands',
        commands: [
          { command: 'psql -U user -d dbname', description: 'Connect to database' },
          { command: '\\l', description: 'List databases' },
          { command: '\\dt', description: 'List tables' },
          { command: '\\d tablename', description: 'Describe table schema' },
          { command: '\\c dbname', description: 'Connect to different database' },
          { command: '\\q', description: 'Quit psql' },
          { command: '\\x', description: 'Toggle expanded output' },
          { command: '\\timing', description: 'Toggle query timing' },
        ],
      },
      {
        title: 'PostgreSQL-Specific',
        commands: [
          { command: 'CREATE TYPE mood AS ENUM (\'happy\', \'sad\');', description: 'Create enum type' },
          { command: "SELECT * FROM t WHERE data->>'key' = 'val';", description: 'JSONB query' },
          { command: 'SELECT * FROM t WHERE col @@ to_tsquery(\'word\');', description: 'Full-text search' },
          { command: 'EXPLAIN ANALYZE SELECT ...', description: 'Query execution plan' },
          { command: 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";', description: 'Enable extension' },
          { command: 'SELECT gen_random_uuid();', description: 'Generate UUID' },
        ],
      },
      {
        title: 'Backup & Restore',
        commands: [
          { command: 'pg_dump dbname > backup.sql', description: 'Dump database to SQL' },
          { command: 'pg_dump -Fc dbname > backup.dump', description: 'Custom format dump' },
          { command: 'pg_restore -d dbname backup.dump', description: 'Restore from dump' },
          { command: 'psql dbname < backup.sql', description: 'Restore from SQL file' },
        ],
      },
    ],
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'databases',
    emoji: '🐬',
    description: 'MySQL database commands and administration',
    tags: ['mysql', 'database', 'sql', 'mariadb'],
    isPopular: false,
    sections: [
      {
        title: 'Connection & Basics',
        commands: [
          { command: 'mysql -u root -p', description: 'Connect to MySQL' },
          { command: 'SHOW DATABASES;', description: 'List databases' },
          { command: 'USE dbname;', description: 'Select database' },
          { command: 'SHOW TABLES;', description: 'List tables' },
          { command: 'DESCRIBE tablename;', description: 'Show table schema' },
          { command: 'SHOW CREATE TABLE t;', description: 'Show CREATE statement' },
        ],
      },
      {
        title: 'MySQL-Specific',
        commands: [
          { command: 'SELECT JSON_EXTRACT(col, "$.key") FROM t;', description: 'JSON query' },
          { command: 'INSERT IGNORE INTO t ...', description: 'Insert, skip duplicates' },
          { command: 'ON DUPLICATE KEY UPDATE col = val', description: 'Upsert' },
          { command: 'SHOW PROCESSLIST;', description: 'Show running queries' },
          { command: 'EXPLAIN SELECT ...', description: 'Query execution plan' },
        ],
      },
      {
        title: 'Backup',
        commands: [
          { command: 'mysqldump -u root -p dbname > backup.sql', description: 'Dump database' },
          { command: 'mysql -u root -p dbname < backup.sql', description: 'Restore from dump' },
        ],
      },
    ],
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'databases',
    emoji: '🍃',
    description: 'MongoDB shell (mongosh) commands',
    tags: ['mongodb', 'mongo', 'nosql', 'document', 'database'],
    isPopular: true,
    sections: [
      {
        title: 'Database & Collections',
        commands: [
          { command: 'show dbs', description: 'List databases' },
          { command: 'use mydb', description: 'Switch/create database' },
          { command: 'show collections', description: 'List collections' },
          { command: 'db.createCollection("users")', description: 'Create collection' },
          { command: 'db.users.drop()', description: 'Drop collection' },
        ],
      },
      {
        title: 'CRUD',
        commands: [
          { command: 'db.users.insertOne({ name: "Alice" })', description: 'Insert one document' },
          { command: 'db.users.insertMany([{...}, {...}])', description: 'Insert multiple documents' },
          { command: 'db.users.find({ age: { $gt: 18 } })', description: 'Find with filter' },
          { command: 'db.users.findOne({ _id: ObjectId("...") })', description: 'Find single document' },
          { command: 'db.users.updateOne({ name: "Alice" }, { $set: { age: 31 } })', description: 'Update one document' },
          { command: 'db.users.deleteMany({ status: "inactive" })', description: 'Delete matching documents' },
        ],
      },
      {
        title: 'Query Operators',
        commands: [
          { command: '{ field: { $eq: value } }', description: 'Equals' },
          { command: '{ field: { $in: [1, 2, 3] } }', description: 'In array of values' },
          { command: '{ $and: [{ a: 1 }, { b: 2 }] }', description: 'Logical AND' },
          { command: '{ $or: [{ a: 1 }, { b: 2 }] }', description: 'Logical OR' },
          { command: '{ field: { $regex: /pattern/i } }', description: 'Regex match' },
          { command: '.sort({ field: -1 }).limit(10)', description: 'Sort descending, limit 10' },
        ],
      },
      {
        title: 'Aggregation',
        commands: [
          { command: 'db.orders.aggregate([{ $match: { status: "A" } }])', description: 'Match stage' },
          { command: '{ $group: { _id: "$category", total: { $sum: "$amount" } } }', description: 'Group and sum' },
          { command: '{ $project: { name: 1, total: 1 } }', description: 'Project specific fields' },
          { command: '{ $lookup: { from: "orders", ... } }', description: 'Join collections' },
        ],
      },
    ],
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'databases',
    emoji: '🔴',
    description: 'Redis in-memory data store commands',
    tags: ['redis', 'cache', 'key-value', 'pub-sub', 'database'],
    isPopular: true,
    sections: [
      {
        title: 'Strings',
        commands: [
          { command: 'SET key "value"', description: 'Set a key' },
          { command: 'GET key', description: 'Get a key' },
          { command: 'SET key "val" EX 3600', description: 'Set with 1-hour expiry' },
          { command: 'INCR counter', description: 'Increment integer value' },
          { command: 'MSET k1 "v1" k2 "v2"', description: 'Set multiple keys' },
          { command: 'MGET k1 k2 k3', description: 'Get multiple keys' },
          { command: 'TTL key', description: 'Check time-to-live (seconds)' },
          { command: 'DEL key', description: 'Delete a key' },
        ],
      },
      {
        title: 'Hashes',
        commands: [
          { command: 'HSET user:1 name "Alice" age 30', description: 'Set hash fields' },
          { command: 'HGET user:1 name', description: 'Get hash field' },
          { command: 'HGETALL user:1', description: 'Get all hash fields' },
          { command: 'HDEL user:1 age', description: 'Delete hash field' },
        ],
      },
      {
        title: 'Lists & Sets',
        commands: [
          { command: 'LPUSH mylist "item"', description: 'Push to left of list' },
          { command: 'RPUSH mylist "item"', description: 'Push to right of list' },
          { command: 'LRANGE mylist 0 -1', description: 'Get all list items' },
          { command: 'SADD myset "member"', description: 'Add to set' },
          { command: 'SMEMBERS myset', description: 'Get all set members' },
          { command: 'SISMEMBER myset "member"', description: 'Check set membership' },
        ],
      },
      {
        title: 'Admin',
        commands: [
          { command: 'KEYS pattern*', description: 'Find keys matching pattern' },
          { command: 'SCAN 0 MATCH "user:*" COUNT 100', description: 'Iterate keys safely' },
          { command: 'INFO', description: 'Server stats' },
          { command: 'FLUSHDB', description: 'Delete all keys in current DB' },
          { command: 'DBSIZE', description: 'Number of keys in current DB' },
        ],
      },
    ],
  },
  {
    id: 'mssql',
    name: 'MS SQL Server',
    category: 'databases',
    emoji: '🔵',
    description: 'Microsoft SQL Server specific commands',
    tags: ['mssql', 'sql server', 'microsoft', 'tsql', 'database'],
    isPopular: false,
    sections: [
      {
        title: 'T-SQL Basics',
        commands: [
          { command: 'SELECT TOP 10 * FROM users;', description: 'Select first 10 rows' },
          { command: 'SELECT * FROM t ORDER BY col OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY;', description: 'Pagination' },
          { command: "IF OBJECT_ID('t') IS NOT NULL DROP TABLE t;", description: 'Safe drop table' },
          { command: 'SELECT GETDATE();', description: 'Current date/time' },
          { command: "SELECT ISNULL(col, 'default');", description: 'Replace NULL' },
          { command: 'SELECT NEWID();', description: 'Generate GUID' },
        ],
      },
      {
        title: 'Admin Commands',
        commands: [
          { command: 'sp_who2', description: 'Show active connections' },
          { command: "SELECT * FROM sys.databases;", description: 'List databases' },
          { command: "SELECT * FROM INFORMATION_SCHEMA.TABLES;", description: 'List tables' },
          { command: "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 't';", description: 'List table columns' },
          { command: 'DBCC CHECKDB;', description: 'Check database integrity' },
        ],
      },
    ],
  },

  // ── NETWORKING ──────────────────────────
  {
    id: 'http-headers',
    name: 'HTTP Headers',
    category: 'networking',
    emoji: '📨',
    description: 'Common HTTP request and response headers',
    tags: ['http', 'headers', 'request', 'response', 'web'],
    isPopular: true,
    sections: [
      {
        title: 'Request Headers',
        commands: [
          { command: 'Accept: application/json', description: 'Expected response format' },
          { command: 'Authorization: Bearer <token>', description: 'Auth token' },
          { command: 'Content-Type: application/json', description: 'Request body format' },
          { command: 'User-Agent: MyApp/1.0', description: 'Client identifier' },
          { command: 'Accept-Language: en-US,en;q=0.9', description: 'Preferred language' },
          { command: 'Cache-Control: no-cache', description: 'Bypass cache' },
          { command: 'Cookie: session=abc123', description: 'Send cookies' },
        ],
      },
      {
        title: 'Response Headers',
        commands: [
          { command: 'Content-Type: application/json; charset=utf-8', description: 'Response body format' },
          { command: 'Cache-Control: public, max-age=86400', description: 'Cache for 24 hours' },
          { command: 'Set-Cookie: session=abc; HttpOnly; Secure', description: 'Set cookie' },
          { command: 'Location: /new-url', description: 'Redirect target' },
          { command: 'X-Request-Id: uuid', description: 'Request tracking ID' },
          { command: 'Access-Control-Allow-Origin: *', description: 'CORS: allow all origins' },
        ],
      },
      {
        title: 'Security Headers',
        commands: [
          { command: 'Strict-Transport-Security: max-age=31536000', description: 'Force HTTPS (HSTS)' },
          { command: "Content-Security-Policy: default-src 'self'", description: 'CSP policy' },
          { command: 'X-Content-Type-Options: nosniff', description: 'Prevent MIME sniffing' },
          { command: 'X-Frame-Options: DENY', description: 'Prevent iframe embedding' },
          { command: 'Referrer-Policy: strict-origin-when-cross-origin', description: 'Control referrer info' },
          { command: 'Permissions-Policy: camera=(), microphone=()', description: 'Restrict browser features' },
        ],
      },
    ],
  },
  {
    id: 'http-status-codes',
    name: 'HTTP Status Codes',
    category: 'networking',
    emoji: '🔢',
    description: 'HTTP response status codes reference',
    tags: ['http', 'status codes', 'rest', 'api', 'web'],
    isPopular: true,
    sections: [
      {
        title: '2xx Success',
        commands: [
          { command: '200 OK', description: 'Request succeeded' },
          { command: '201 Created', description: 'Resource created (POST)' },
          { command: '204 No Content', description: 'Success with no response body (DELETE)' },
          { command: '206 Partial Content', description: 'Range request fulfilled' },
        ],
      },
      {
        title: '3xx Redirection',
        commands: [
          { command: '301 Moved Permanently', description: 'URL permanently changed (SEO redirect)' },
          { command: '302 Found', description: 'Temporary redirect' },
          { command: '304 Not Modified', description: 'Cached version is current' },
          { command: '307 Temporary Redirect', description: 'Temporary redirect (preserves method)' },
          { command: '308 Permanent Redirect', description: 'Permanent redirect (preserves method)' },
        ],
      },
      {
        title: '4xx Client Errors',
        commands: [
          { command: '400 Bad Request', description: 'Malformed request syntax' },
          { command: '401 Unauthorized', description: 'Authentication required' },
          { command: '403 Forbidden', description: 'Authenticated but not authorized' },
          { command: '404 Not Found', description: 'Resource not found' },
          { command: '405 Method Not Allowed', description: 'HTTP method not supported' },
          { command: '409 Conflict', description: 'Request conflicts with current state' },
          { command: '422 Unprocessable Entity', description: 'Validation error' },
          { command: '429 Too Many Requests', description: 'Rate limit exceeded' },
        ],
      },
      {
        title: '5xx Server Errors',
        commands: [
          { command: '500 Internal Server Error', description: 'Generic server error' },
          { command: '502 Bad Gateway', description: 'Invalid response from upstream' },
          { command: '503 Service Unavailable', description: 'Server overloaded or in maintenance' },
          { command: '504 Gateway Timeout', description: 'Upstream server timeout' },
        ],
      },
    ],
  },
  {
    id: 'curl',
    name: 'curl',
    category: 'networking',
    emoji: '🌀',
    description: 'curl HTTP client command-line examples',
    tags: ['curl', 'http', 'api', 'rest', 'testing'],
    isPopular: true,
    sections: [
      {
        title: 'Basic Requests',
        commands: [
          { command: 'curl https://api.example.com', description: 'Simple GET request' },
          { command: 'curl -v https://api.example.com', description: 'Verbose output (headers)' },
          { command: 'curl -o output.json https://api.example.com', description: 'Save to file' },
          { command: 'curl -L https://example.com', description: 'Follow redirects' },
          { command: 'curl -s https://api.example.com | jq .', description: 'Silent + pipe to jq' },
        ],
      },
      {
        title: 'POST & Data',
        commands: [
          { command: 'curl -X POST -H "Content-Type: application/json" -d \'{"key":"val"}\' URL', description: 'POST JSON' },
          { command: 'curl -X PUT -d @data.json URL', description: 'PUT with file as body' },
          { command: 'curl -X DELETE URL', description: 'DELETE request' },
          { command: 'curl -F "file=@photo.jpg" URL', description: 'Upload file (multipart)' },
        ],
      },
      {
        title: 'Auth & Headers',
        commands: [
          { command: 'curl -H "Authorization: Bearer TOKEN" URL', description: 'Bearer token auth' },
          { command: 'curl -u user:pass URL', description: 'Basic auth' },
          { command: 'curl -H "X-Custom: value" URL', description: 'Custom header' },
          { command: 'curl -b "session=abc" URL', description: 'Send cookie' },
          { command: 'curl -I URL', description: 'HEAD request (headers only)' },
        ],
      },
    ],
  },
  {
    id: 'dns-records',
    name: 'DNS Records',
    category: 'networking',
    emoji: '🔍',
    description: 'DNS record types and lookup commands',
    tags: ['dns', 'records', 'domain', 'networking', 'dig', 'nslookup'],
    isPopular: false,
    sections: [
      {
        title: 'Record Types',
        commands: [
          { command: 'A', description: 'Maps domain to IPv4 address' },
          { command: 'AAAA', description: 'Maps domain to IPv6 address' },
          { command: 'CNAME', description: 'Alias for another domain' },
          { command: 'MX', description: 'Mail server for domain' },
          { command: 'TXT', description: 'Text record (SPF, DKIM, verification)' },
          { command: 'NS', description: 'Nameserver for domain' },
          { command: 'SOA', description: 'Start of Authority (zone info)' },
          { command: 'SRV', description: 'Service location record' },
          { command: 'CAA', description: 'Certificate Authority Authorization' },
          { command: 'PTR', description: 'Reverse DNS lookup' },
        ],
      },
      {
        title: 'Lookup Commands',
        commands: [
          { command: 'dig example.com A', description: 'Query A record' },
          { command: 'dig example.com MX +short', description: 'Short MX lookup' },
          { command: 'dig @8.8.8.8 example.com', description: 'Query specific nameserver' },
          { command: 'nslookup example.com', description: 'Basic DNS lookup' },
          { command: 'host example.com', description: 'Simple DNS lookup' },
          { command: 'dig example.com ANY', description: 'Query all record types' },
          { command: 'whois example.com', description: 'Domain registration info' },
        ],
      },
    ],
  },

  // ── SECURITY ──────────────────────────
  {
    id: 'openssl',
    name: 'OpenSSL',
    category: 'security',
    emoji: '🔐',
    description: 'OpenSSL commands for certificates and encryption',
    tags: ['openssl', 'ssl', 'tls', 'certificates', 'encryption'],
    isPopular: false,
    sections: [
      {
        title: 'Certificates',
        commands: [
          { command: 'openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes', description: 'Generate self-signed cert' },
          { command: 'openssl req -new -key key.pem -out csr.pem', description: 'Generate CSR' },
          { command: 'openssl x509 -in cert.pem -text -noout', description: 'View certificate details' },
          { command: 'openssl x509 -in cert.pem -enddate -noout', description: 'Check expiry date' },
          { command: 'openssl verify -CAfile ca.pem cert.pem', description: 'Verify certificate chain' },
        ],
      },
      {
        title: 'Connection Testing',
        commands: [
          { command: 'openssl s_client -connect example.com:443', description: 'Test TLS connection' },
          { command: 'openssl s_client -connect example.com:443 -showcerts', description: 'Show full cert chain' },
          { command: 'openssl s_client -connect example.com:443 -servername example.com', description: 'Test with SNI' },
        ],
      },
      {
        title: 'Encryption',
        commands: [
          { command: 'openssl genrsa -out private.pem 4096', description: 'Generate RSA private key' },
          { command: 'openssl rsa -in private.pem -pubout -out public.pem', description: 'Extract public key' },
          { command: 'openssl dgst -sha256 file.txt', description: 'SHA-256 hash of file' },
          { command: 'openssl rand -hex 32', description: 'Generate random hex string' },
          { command: 'openssl enc -aes-256-cbc -in plain.txt -out enc.txt', description: 'Encrypt file' },
        ],
      },
    ],
  },
  {
    id: 'jwt',
    name: 'JWT (JSON Web Tokens)',
    category: 'security',
    emoji: '🎫',
    description: 'JWT structure, claims, and usage patterns',
    tags: ['jwt', 'json web token', 'auth', 'claims', 'bearer'],
    isPopular: true,
    sections: [
      {
        title: 'Structure (header.payload.signature)',
        commands: [
          { command: '{ "alg": "HS256", "typ": "JWT" }', description: 'Header: algorithm + type' },
          { command: '{ "sub": "user123", "iat": 1234567890 }', description: 'Payload: claims' },
          { command: 'HMACSHA256(base64(header) + "." + base64(payload), secret)', description: 'Signature creation' },
        ],
      },
      {
        title: 'Standard Claims',
        commands: [
          { command: 'iss (Issuer)', description: 'Who created the token' },
          { command: 'sub (Subject)', description: 'User/entity the token is about' },
          { command: 'aud (Audience)', description: 'Intended recipient' },
          { command: 'exp (Expiration)', description: 'Token expiry (Unix timestamp)' },
          { command: 'iat (Issued At)', description: 'Token creation time' },
          { command: 'nbf (Not Before)', description: 'Token not valid before this time' },
          { command: 'jti (JWT ID)', description: 'Unique token identifier' },
        ],
      },
      {
        title: 'Common Algorithms',
        commands: [
          { command: 'HS256', description: 'HMAC with SHA-256 (symmetric, shared secret)' },
          { command: 'RS256', description: 'RSA with SHA-256 (asymmetric, public/private key)' },
          { command: 'ES256', description: 'ECDSA with SHA-256 (asymmetric, smaller keys)' },
          { command: 'none', description: 'No signature (NEVER use in production!)' },
        ],
      },
      {
        title: 'Best Practices',
        commands: [
          { command: 'Store in HttpOnly cookie (not localStorage)', description: 'Prevents XSS access' },
          { command: 'Set short expiration (15-60 min)', description: 'Minimize stolen token window' },
          { command: 'Use refresh tokens for long sessions', description: 'Short-lived access + long-lived refresh' },
          { command: 'Validate iss, aud, exp on every request', description: 'Always verify all claims' },
          { command: 'Use RS256 for public APIs', description: 'Clients verify without knowing secret' },
        ],
      },
    ],
  },
  {
    id: 'oauth-flow',
    name: 'OAuth 2.0 Flow',
    category: 'security',
    emoji: '🔑',
    description: 'OAuth 2.0 authorization flows and endpoints',
    tags: ['oauth', 'oauth2', 'authorization', 'openid', 'oidc'],
    isPopular: false,
    sections: [
      {
        title: 'Authorization Code Flow',
        commands: [
          { command: 'GET /authorize?response_type=code&client_id=X&redirect_uri=Y&scope=Z', description: '1. Redirect user to auth server' },
          { command: 'GET /callback?code=AUTH_CODE', description: '2. Auth server redirects back with code' },
          { command: 'POST /token { grant_type: "authorization_code", code, redirect_uri, client_id, client_secret }', description: '3. Exchange code for token' },
          { command: 'Response: { access_token, token_type, expires_in, refresh_token }', description: '4. Receive tokens' },
        ],
      },
      {
        title: 'PKCE Extension (for SPAs/Mobile)',
        commands: [
          { command: 'code_verifier = random_string(43-128 chars)', description: 'Generate random verifier' },
          { command: 'code_challenge = BASE64URL(SHA256(code_verifier))', description: 'Create challenge from verifier' },
          { command: '/authorize?...&code_challenge=X&code_challenge_method=S256', description: 'Send challenge in auth request' },
          { command: '/token { ..., code_verifier }', description: 'Send verifier in token request' },
        ],
      },
      {
        title: 'Grant Types',
        commands: [
          { command: 'authorization_code', description: 'Server-side apps (most secure)' },
          { command: 'client_credentials', description: 'Machine-to-machine (no user)' },
          { command: 'refresh_token', description: 'Exchange refresh token for new access' },
          { command: 'device_code', description: 'TV / limited-input devices' },
        ],
      },
      {
        title: 'Scopes & Tokens',
        commands: [
          { command: 'openid profile email', description: 'Common OIDC scopes' },
          { command: 'Access Token: short-lived (15-60 min)', description: 'Used to access APIs' },
          { command: 'Refresh Token: long-lived (days-weeks)', description: 'Used to get new access tokens' },
          { command: 'ID Token: JWT with user info', description: 'OpenID Connect only' },
        ],
      },
    ],
  },
  {
    id: 'owasp-top10',
    name: 'OWASP Top 10',
    category: 'security',
    emoji: '🛡️',
    description: 'OWASP Top 10 web security risks and mitigations',
    tags: ['owasp', 'security', 'vulnerabilities', 'web security'],
    isPopular: true,
    sections: [
      {
        title: 'Top 10 (2021)',
        commands: [
          { command: 'A01: Broken Access Control', description: 'Enforce least privilege, deny by default, validate RBAC' },
          { command: 'A02: Cryptographic Failures', description: 'Use TLS, hash passwords (bcrypt/argon2), no hardcoded secrets' },
          { command: 'A03: Injection', description: 'Parameterized queries, input validation, escape output' },
          { command: 'A04: Insecure Design', description: 'Threat modeling, secure design patterns, abuse case testing' },
          { command: 'A05: Security Misconfiguration', description: 'Remove defaults, disable directory listing, review cloud perms' },
          { command: 'A06: Vulnerable Components', description: 'Track dependencies (SCA), update regularly, remove unused' },
          { command: 'A07: Auth Failures', description: 'MFA, rate limiting, secure session management' },
          { command: 'A08: Data Integrity Failures', description: 'Verify signatures, use SRI, secure CI/CD pipelines' },
          { command: 'A09: Logging Failures', description: 'Log auth events, monitor anomalies, no sensitive data in logs' },
          { command: 'A10: SSRF', description: 'Validate URLs, deny internal network access, use allowlists' },
        ],
      },
      {
        title: 'Quick Prevention Checklist',
        commands: [
          { command: 'Use parameterized queries (never concatenate SQL)', description: 'Prevent SQL injection' },
          { command: 'Escape/sanitize all user input in HTML output', description: 'Prevent XSS' },
          { command: 'Use CSRF tokens on state-changing requests', description: 'Prevent CSRF' },
          { command: 'Set Content-Security-Policy header', description: 'Mitigate XSS impact' },
          { command: 'Store passwords with bcrypt/argon2 (never plaintext/MD5)', description: 'Secure password storage' },
          { command: 'Enforce HTTPS everywhere (HSTS header)', description: 'Prevent MITM' },
        ],
      },
    ],
  },

  // ── AI & ML ──────────────────────────
  {
    id: 'numpy',
    name: 'NumPy',
    category: 'ai-ml',
    emoji: '🔢',
    description: 'NumPy array operations and functions',
    tags: ['numpy', 'python', 'arrays', 'math', 'data science'],
    isPopular: true,
    sections: [
      {
        title: 'Array Creation',
        commands: [
          { command: 'np.array([1, 2, 3])', description: 'Create from list' },
          { command: 'np.zeros((3, 4))', description: 'Array of zeros (3x4)' },
          { command: 'np.ones((2, 3))', description: 'Array of ones (2x3)' },
          { command: 'np.arange(0, 10, 2)', description: 'Range array [0, 2, 4, 6, 8]' },
          { command: 'np.linspace(0, 1, 100)', description: '100 evenly spaced values' },
          { command: 'np.random.randn(3, 3)', description: 'Random normal 3x3' },
          { command: 'np.eye(4)', description: '4x4 identity matrix' },
        ],
      },
      {
        title: 'Array Operations',
        commands: [
          { command: 'arr.shape', description: 'Array dimensions' },
          { command: 'arr.reshape(2, 6)', description: 'Reshape array' },
          { command: 'arr.T', description: 'Transpose' },
          { command: 'arr[1:3, :]', description: 'Slice rows 1-2, all columns' },
          { command: 'arr[arr > 5]', description: 'Boolean indexing (filter)' },
          { command: 'np.concatenate([a, b], axis=0)', description: 'Concatenate arrays' },
        ],
      },
      {
        title: 'Math & Stats',
        commands: [
          { command: 'np.sum(arr, axis=0)', description: 'Sum along axis' },
          { command: 'np.mean(arr)', description: 'Mean of array' },
          { command: 'np.std(arr)', description: 'Standard deviation' },
          { command: 'np.dot(a, b)', description: 'Dot product / matrix multiply' },
          { command: 'np.argmax(arr)', description: 'Index of max value' },
          { command: 'np.clip(arr, 0, 1)', description: 'Clip values to range' },
        ],
      },
    ],
  },
  {
    id: 'pandas',
    name: 'Pandas',
    category: 'ai-ml',
    emoji: '🐼',
    description: 'Pandas DataFrame operations and data analysis',
    tags: ['pandas', 'python', 'dataframe', 'data analysis', 'csv'],
    isPopular: true,
    sections: [
      {
        title: 'Create & Load',
        commands: [
          { command: "df = pd.read_csv('file.csv')", description: 'Read CSV file' },
          { command: "df = pd.DataFrame({'col1': [1,2], 'col2': [3,4]})", description: 'Create from dict' },
          { command: "df.to_csv('output.csv', index=False)", description: 'Save to CSV' },
          { command: 'df.head(10)', description: 'First 10 rows' },
          { command: 'df.info()', description: 'Column types and null counts' },
          { command: 'df.describe()', description: 'Summary statistics' },
        ],
      },
      {
        title: 'Select & Filter',
        commands: [
          { command: "df['col']", description: 'Select single column (Series)' },
          { command: "df[['col1', 'col2']]", description: 'Select multiple columns' },
          { command: 'df[df.age > 18]', description: 'Filter rows by condition' },
          { command: "df.query('age > 18 and city == \"NYC\"')", description: 'Filter with query string' },
          { command: 'df.iloc[0:5]', description: 'Select rows by position' },
          { command: "df.loc[df.name == 'Alice']", description: 'Select rows by label/condition' },
          { command: 'df.nlargest(5, "score")', description: 'Top 5 by score' },
        ],
      },
      {
        title: 'Transform',
        commands: [
          { command: 'df.groupby("category").sum()', description: 'Group and aggregate' },
          { command: "df.sort_values('col', ascending=False)", description: 'Sort descending' },
          { command: "df['new'] = df['a'] + df['b']", description: 'Create new column' },
          { command: 'df.drop(columns=["col"])', description: 'Drop column' },
          { command: 'df.dropna()', description: 'Drop rows with NaN' },
          { command: "df.fillna(0)", description: 'Fill NaN with value' },
          { command: 'df.rename(columns={"old": "new"})', description: 'Rename column' },
          { command: 'pd.merge(df1, df2, on="key")', description: 'Merge (SQL-like join)' },
        ],
      },
    ],
  },
  {
    id: 'pytorch',
    name: 'PyTorch Basics',
    category: 'ai-ml',
    emoji: '🔥',
    description: 'PyTorch tensor operations and model training',
    tags: ['pytorch', 'deep learning', 'tensors', 'neural networks', 'ai'],
    isPopular: false,
    sections: [
      {
        title: 'Tensors',
        commands: [
          { command: 'x = torch.tensor([1.0, 2.0, 3.0])', description: 'Create tensor' },
          { command: 'x = torch.zeros(3, 4)', description: 'Zeros tensor' },
          { command: 'x = torch.randn(3, 4)', description: 'Random normal tensor' },
          { command: 'x.shape', description: 'Tensor dimensions' },
          { command: 'x.to("cuda")', description: 'Move to GPU' },
          { command: 'x.requires_grad_(True)', description: 'Enable gradient tracking' },
        ],
      },
      {
        title: 'Model Definition',
        commands: [
          { command: 'class Net(nn.Module):', description: 'Define model class' },
          { command: 'nn.Linear(in_features, out_features)', description: 'Fully connected layer' },
          { command: 'nn.Conv2d(in_ch, out_ch, kernel_size)', description: 'Convolution layer' },
          { command: 'nn.ReLU()', description: 'ReLU activation' },
          { command: 'nn.Sequential(layer1, layer2, ...)', description: 'Sequential model' },
        ],
      },
      {
        title: 'Training Loop',
        commands: [
          { command: 'optimizer = torch.optim.Adam(model.parameters(), lr=0.001)', description: 'Adam optimizer' },
          { command: 'loss_fn = nn.CrossEntropyLoss()', description: 'Classification loss' },
          { command: 'loss = loss_fn(output, target)', description: 'Compute loss' },
          { command: 'loss.backward()', description: 'Backpropagation' },
          { command: 'optimizer.step()', description: 'Update weights' },
          { command: 'optimizer.zero_grad()', description: 'Clear gradients' },
          { command: 'model.eval(); torch.no_grad()', description: 'Inference mode' },
        ],
      },
    ],
  },
  {
    id: 'prompt-engineering',
    name: 'Prompt Engineering',
    category: 'ai-ml',
    emoji: '💬',
    description: 'LLM prompt engineering patterns and techniques',
    tags: ['prompt engineering', 'llm', 'chatgpt', 'claude', 'ai'],
    isPopular: true,
    sections: [
      {
        title: 'Core Techniques',
        commands: [
          { command: 'Zero-shot: "Classify this review as positive or negative: ..."', description: 'No examples, just instruction' },
          { command: 'Few-shot: "Example 1: ... → positive\\nExample 2: ... → negative\\nClassify: ..."', description: 'Provide examples first' },
          { command: 'Chain-of-Thought: "Think step by step. First..."', description: 'Guide reasoning process' },
          { command: 'System prompt: "You are a senior code reviewer..."', description: 'Set role and context' },
          { command: 'Self-consistency: Ask same question 3x, take majority', description: 'Reduce variance' },
        ],
      },
      {
        title: 'Formatting Patterns',
        commands: [
          { command: 'Output as JSON: "Respond in JSON format: { name, category, score }"', description: 'Structured output' },
          { command: 'Delimiters: "Text: ```{input}```"', description: 'Clearly separate input from instructions' },
          { command: 'Constraints: "Answer in exactly 3 bullet points"', description: 'Control output format' },
          { command: 'Negative: "Do NOT include explanations"', description: 'Exclude unwanted content' },
        ],
      },
      {
        title: 'Advanced Patterns',
        commands: [
          { command: 'Tree of Thought: "Consider 3 approaches. For each..."', description: 'Explore multiple paths' },
          { command: 'ReAct: "Thought: ... Action: search(...) Observation: ..."', description: 'Reasoning + Action loop' },
          { command: 'Recursive: "Summarize, then summarize the summary"', description: 'Progressive refinement' },
          { command: 'Critique: "Review your answer. Find flaws. Fix them."', description: 'Self-improvement' },
        ],
      },
    ],
  },

  // ── MARKDOWN & DOCS ──────────────────────
  {
    id: 'markdown',
    name: 'Markdown',
    category: 'markdown-docs',
    emoji: '📝',
    description: 'Markdown syntax for documentation',
    tags: ['markdown', 'md', 'documentation', 'readme', 'formatting'],
    isPopular: true,
    sections: [
      {
        title: 'Headings & Text',
        commands: [
          { command: '# Heading 1', description: 'Top-level heading' },
          { command: '## Heading 2', description: 'Sub-heading' },
          { command: '**bold text**', description: 'Bold' },
          { command: '*italic text*', description: 'Italic' },
          { command: '~~strikethrough~~', description: 'Strikethrough' },
          { command: '> This is a blockquote', description: 'Blockquote' },
          { command: '---', description: 'Horizontal rule' },
        ],
      },
      {
        title: 'Lists',
        commands: [
          { command: '- Item 1\\n- Item 2', description: 'Unordered list' },
          { command: '1. First\\n2. Second', description: 'Ordered list' },
          { command: '- [x] Done\\n- [ ] Todo', description: 'Task list (GitHub)' },
          { command: '  - Nested item', description: 'Nested list (2 spaces indent)' },
        ],
      },
      {
        title: 'Links & Images',
        commands: [
          { command: '[Link text](https://example.com)', description: 'Hyperlink' },
          { command: '![Alt text](image.png)', description: 'Image' },
          { command: '[text](url "tooltip")', description: 'Link with title' },
          { command: '<https://example.com>', description: 'Auto-linked URL' },
        ],
      },
      {
        title: 'Code',
        commands: [
          { command: '`inline code`', description: 'Inline code' },
          { command: '```js\\ncode block\\n```', description: 'Fenced code block with language' },
          { command: '    indented code', description: 'Indented code block (4 spaces)' },
        ],
      },
      {
        title: 'Tables',
        commands: [
          { command: '| Header | Header |\\n|--------|--------|\\n| Cell   | Cell   |', description: 'Table syntax' },
          { command: '| :--- | :---: | ---: |', description: 'Left, center, right align' },
        ],
      },
    ],
  },
  {
    id: 'jsdoc',
    name: 'JSDoc',
    category: 'markdown-docs',
    emoji: '📄',
    description: 'JSDoc documentation comments for JavaScript',
    tags: ['jsdoc', 'documentation', 'javascript', 'comments', 'types'],
    isPopular: false,
    sections: [
      {
        title: 'Basic Tags',
        commands: [
          { command: '/** @param {string} name - Description */', description: 'Parameter documentation' },
          { command: '/** @returns {number} Description */', description: 'Return value documentation' },
          { command: '/** @type {string} */', description: 'Variable type' },
          { command: '/** @typedef {Object} User\\n * @property {string} name\\n * @property {number} age */', description: 'Custom type definition' },
          { command: '/** @example\\n * add(1, 2) // => 3\\n */', description: 'Usage example' },
        ],
      },
      {
        title: 'Common Patterns',
        commands: [
          { command: '/** @param {string[]} items */', description: 'Array of strings' },
          { command: '/** @param {string|number} id */', description: 'Union type' },
          { command: '/** @param {Object} opts\\n * @param {string} opts.name */', description: 'Options object' },
          { command: '/** @template T\\n * @param {T} val\\n * @returns {T} */', description: 'Generic function' },
          { command: '/** @deprecated Use newFn() instead */', description: 'Mark as deprecated' },
          { command: '/** @throws {Error} If input is invalid */', description: 'Document thrown errors' },
        ],
      },
    ],
  },
  {
    id: 'mdx',
    name: 'MDX',
    category: 'markdown-docs',
    emoji: '⚡',
    description: 'MDX: Markdown + JSX components',
    tags: ['mdx', 'markdown', 'jsx', 'react', 'documentation', 'content'],
    isPopular: false,
    sections: [
      {
        title: 'Basics',
        commands: [
          { command: 'import { Button } from "./Button"', description: 'Import React component in MDX' },
          { command: '<Button onClick={action}>Click me</Button>', description: 'Use JSX in Markdown' },
          { command: 'export const meta = { title: "My Post" }', description: 'Export metadata' },
          { command: '{props.children}', description: 'Render children (layout)' },
        ],
      },
      {
        title: 'Frontmatter & Components',
        commands: [
          { command: '---\\ntitle: My Post\\ndate: 2024-01-01\\n---', description: 'YAML frontmatter' },
          { command: '<Callout type="warning">Be careful!</Callout>', description: 'Custom component in content' },
          { command: '<Tabs items={["npm","yarn"]}><Tab>npm i</Tab></Tabs>', description: 'Interactive tabs component' },
          { command: "import { Mermaid } from './Mermaid'\\n<Mermaid chart={`graph TD...`} />", description: 'Embedded diagrams' },
        ],
      },
    ],
  },
]

// ── Helper Functions ──────────────────────────

export function getCheatsheetsByCategory(category) {
  if (category === 'all') return cheatsheets
  return cheatsheets.filter((s) => s.category === category)
}

export function getPopularCheatsheets() {
  return cheatsheets.filter((s) => s.isPopular)
}

export function getCheatsheetById(id) {
  return cheatsheets.find((s) => s.id === id) || null
}

export function getTotalCommandCount() {
  return cheatsheets.reduce(
    (acc, cs) => acc + cs.sections.reduce((a, s) => a + s.commands.length, 0),
    0
  )
}

export function getCategoryCounts() {
  const counts = { all: cheatsheets.length }
  for (const cs of cheatsheets) {
    counts[cs.category] = (counts[cs.category] || 0) + 1
  }
  return counts
}
