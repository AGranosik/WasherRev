CREATE PROCEDURE BuildingUser_Remove(
	@Id int
)
AS
BEGIN
	DELETE FROM [dbo].[BuildingUser]
	WHERE Id = @Id
END