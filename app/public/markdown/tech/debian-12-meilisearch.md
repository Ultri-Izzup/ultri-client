# Install Meilisearch on EC2

Generic install instructions for [Meilisearch](https://www.meilisearch.com/docs/learn/getting_started/installation)

[AWS Specific AMI Install for Meilisearch](https://www.meilisearch.com/docs/learn/cookbooks/aws)

When creating the instance add S3 connectivity for backups
Advanced details -> IAM instance profile

[Make sure to complete the production Meiliserch install steps](https://www.meilisearch.com/docs/learn/cookbooks/aws#part-2-configure-production-settings)

```sh
curl -v http://search.izzup.com/health
```

Logging into the server via SSH as admin will lead you through the prod setup.

```sh
ssh -i "~/.ssh/key.pem" admin@search.izzup.com
```
You should already have your hostname pointed to the server.
If not, you can update the config later by running

```sh
meilisearch-setup
```

after Prod changes:
```sh
curl -v https://search.izzup.com/health
```
