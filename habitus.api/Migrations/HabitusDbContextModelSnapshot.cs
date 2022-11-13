﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using habitus.api.Data;

#nullable disable

namespace habitus.api.Migrations
{
    [DbContext(typeof(HabitusDbContext))]
    partial class HabitusDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.10");

            modelBuilder.Entity("habitus.api.Models.Entry", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Date")
                        .HasColumnType("TEXT");

                    b.Property<int>("HabitId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("HabitId");

                    b.ToTable("Entries");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Date = new DateTime(2022, 10, 11, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            HabitId = 1,
                            UserId = "1"
                        },
                        new
                        {
                            Id = 2,
                            Date = new DateTime(2022, 10, 12, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            HabitId = 1,
                            UserId = "1"
                        },
                        new
                        {
                            Id = 3,
                            Date = new DateTime(2022, 10, 13, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            HabitId = 1,
                            UserId = "1"
                        },
                        new
                        {
                            Id = 4,
                            Date = new DateTime(2022, 10, 11, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            HabitId = 2,
                            UserId = "1"
                        },
                        new
                        {
                            Id = 5,
                            Date = new DateTime(2022, 10, 12, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            HabitId = 2,
                            UserId = "1"
                        },
                        new
                        {
                            Id = 6,
                            Date = new DateTime(2022, 10, 14, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            HabitId = 2,
                            UserId = "1"
                        },
                        new
                        {
                            Id = 7,
                            Date = new DateTime(2022, 10, 15, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            HabitId = 2,
                            UserId = "1"
                        });
                });

            modelBuilder.Entity("habitus.api.Models.Habit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<int>("Goal")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Habits");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Color = "#32a852",
                            Description = "Read a book",
                            Goal = 3,
                            Title = "Read",
                            UserId = "1"
                        },
                        new
                        {
                            Id = 2,
                            Color = "#2b26b5",
                            Description = "For atleast 15 minutes",
                            Goal = 5,
                            Title = "Exercise",
                            UserId = "1"
                        },
                        new
                        {
                            Id = 3,
                            Color = "#701933",
                            Description = "For atleast 10 minutes",
                            Goal = 2,
                            Title = "Meditate",
                            UserId = "1"
                        });
                });

            modelBuilder.Entity("habitus.api.Models.Entry", b =>
                {
                    b.HasOne("habitus.api.Models.Habit", null)
                        .WithMany("Entries")
                        .HasForeignKey("HabitId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("habitus.api.Models.Habit", b =>
                {
                    b.Navigation("Entries");
                });
#pragma warning restore 612, 618
        }
    }
}
