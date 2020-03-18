# LancetApp
Lancet eLab web API written in ASP.Net Core And Angular
1.This Solution works with MS SQL Server and ASP.Net Core 3.0>(Please install if necessary)
2. Open VS and run "update-database" command under LancetApp.DAL Package Manager Console to create a DB

To Login use:
## username is: hello@doctor.com
## password Is : No1Know$

The Solution is divided into modules:

LancetApp.UI.Web ---The is where UI is done,has controllers and Angular clientApp
LancetApp.Commmon ---This is where shared file like DTOs and Helper funtions go,No business logic should be done here
LancetApp.Core ---This where the Business logic should be done
LancetAp.DAL --- This is the DB Access Layer,here you find your entities,DBContext class and Seeder


