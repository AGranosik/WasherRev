CREATE PROCEDURE Room_Update(
	@Id int,
	@Name varchar(MAX),
	@Floor int,
	@Capacity int,
	@BuildingId int,
	@IsActive bit
)
AS
BEGIN
	UPDATE [dbo].[Room]
	SET Name = ISNULL(@Name, Name),
	Floor = ISNULL(@Floor, Floor),
	Capacity = ISNULL(@Capacity, Capacity),
	BuildingId = ISNULL(@BuildingId, BuildingId),
	IsActive = ISNULL(@IsActive, IsActive)
	WHERE [Id] = @Id
END