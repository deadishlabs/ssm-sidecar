# yankcreds

Pull secrets from AWS SSM Parameter Store and write them into a `.env` file for `dotenv` to consume on app start.
https://github.com/motdotla/dotenv

Looks for the file `Secretfile` which has the format `ENVVARTOSET ssmkeyfromparameterstore`.
