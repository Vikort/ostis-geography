file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (CountAverageBooksModule SHARED ${SOURCES})

target_include_directories(CountAverageBooksModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(CountAverageBooksModule sc-memory)

add_dependencies(CountAverageBooksModule sc-memory)

sc_codegen(CountAverageBooksModule ${CMAKE_CURRENT_LIST_DIR})
