﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace habitus.api.Migrations
{
    [DbContext(typeof(AppContext))]
    [Migration("20221011220309_ChangeTableNames")]
    partial class ChangeTableNames
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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

                    b.HasKey("Id");

                    b.HasIndex("HabitId");

                    b.ToTable("Entries");
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
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Goal")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Title")
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
                            Title = "Read"
                        },
                        new
                        {
                            Id = 2,
                            Color = "#2b26b5",
                            Description = "For atleast 15 minutes",
                            Goal = 5,
                            Title = "Exercise"
                        },
                        new
                        {
                            Id = 3,
                            Color = "#701933",
                            Description = "For atleast 10 minutes",
                            Goal = 2,
                            Title = "Meditate"
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
