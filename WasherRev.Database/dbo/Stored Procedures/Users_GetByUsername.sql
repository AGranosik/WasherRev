CREATE PROCEDURE [dbo].[Users_GetByLogin]
	@Username varchar(max)
AS
BEGIN
	SELECT
	[Id],
	[RoleNo],
	[Username],
	[Password],
	[Salt],
	[Email],
	[BuildingId],
	[IsActive]
	FROM [dbo].[Users]
	WHERE [IsActive] = 1
	AND [Username] = @Username
END