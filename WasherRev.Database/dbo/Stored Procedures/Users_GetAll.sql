CREATE PROCEDURE Users_GetAll
AS
BEGIN
	SELECT 
	[Id],
	[RoleNo],
	[Username],
	[Password],
	[Salt],
	[Email],
	[RoomId],
	[IsActive]
	FROM [dbo].[Users]
	WHERE [IsActive] = 1
END