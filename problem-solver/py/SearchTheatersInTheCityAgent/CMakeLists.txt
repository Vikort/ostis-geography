file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (SearchTheatersInTheCityModule SHARED ${SOURCES})

target_include_directories(SearchTheatersInTheCityModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(SearchTheatersInTheCityModule sc-memory)

add_dependencies(SearchTheatersInTheCityModule sc-memory)

sc_codegen(SearchTheatersInTheCityModule ${CMAKE_CURRENT_LIST_DIR})
