CREATE PROCEDURE Producer_GetAll
AS
BEGIN
	SELECT
	[Id],
	[Name],
	[ServicePhoneNo]
	FROM [dbo].[Producer]
END